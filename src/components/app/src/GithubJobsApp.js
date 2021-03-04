import AppHeader from '../../appheader/src/AppHeader.js';
import FilterForm from '../../filterform/src/FilterForm.js';
import GithubJobsListings from '../../githubjobslistings/src/GithubJobsListings.js';
import eventBus from '../../../utils/EventBus.js';
import Navigo from '../../../utils/navigo.es.js';

class GithubJobsApp extends HTMLElement {
    static get observedAttributes() {
        return ['apiURL'];
    }
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.event = '';
        this.observer = eventBus;

    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.html();
        this.css();
        this.scripts();
    }

    html() {
        this.shadowRoot.innerHTML += `
            <div id="appOuterContainer">
                <div id="appInnerContainer">
                    <app-header></app-header>
                    <filter-form></filter-form>
                    <div id="route">
                        <github-jobs-listings
                            listingsPreviewsPerPage=12
                        ></github-jobs-listings>
                    </div>
                </div>
            </div>
        `;
    }

    css() {
        this.shadowRoot.innerHTML += `
        <style>
            :host {
                display: block;
            }

            #appOuterContainer {
                margin-left: auto;
                margin-right: auto;
                max-width: 1440px;
            }

            #appInnerContainer {
                background-image: url('../src/assets/icons/desktop/bg-pattern-header.svg');
                background-repeat: no-repeat;    
                padding-left: clamp(33px, 12vw, 165px);
                padding-right: clamp(33px, 12vw, 165px);
                OUTLINE: 2PX SOLID GOLD;
            }
                
            @media screen and (max-width: 768px) {
                #appInnerContainer {
                    background-image: url('../src/assets/icons/tablet/bg-pattern-header.svg');
                    padding-left: clamp(7.8px, 6vw, 39px);
                    padding-right: clamp(8px, 6vw, 40px);
                }
            }
                
            @media screen and (max-width: 375px) {
                #appInnerContainer {
                    background-image: url('../src/assets/icons/mobile/bg-pattern-header.svg');
                    padding-left: clamp(4.8px, 7vw, 24px);
                    padding-right: clamp(4.8px, 7vw, 24px);
                }
            }
        </style>
        `;
    }

    scripts() {
        this.routerInit();
        this.subscriberRegistration();
        this.getListingData();
    }

    routerInit() {
        console.log('Executing routerInit()');
        const route = this.shadowRoot.querySelector('#route');

        const router = new Navigo(window.location.origin);

        router
            .on({
                "/listings": () => route.innerHTML = `<github-jobs-listings
                    listingsPreviewsPerPage=12
                ></github-jobs-listings>`,
                "/selectedListing": () => route.innerHTML = `<dev-jobs-listings></dev-jobs-listings>`
            });
    }

    cachedFetch(url, options) {
        console.log(`Executing cachedFetch()`);
        let expiration = 60 * 60 * 12;

        switch (options) {
            case 'number':
                expiration = options;
                options = undefined;
                break;
            case 'object':
                expiration = options.seconds || expiration;
                break;
        }

        let cacheKey = url;
        let cached = localStorage.getItem(cacheKey);
        (!cached) 
            ? console.log(`The data is not from the local cache`)
            : console.log(`The data came from the local cache`);
        let whenCached = localStorage.getItem(`${cacheKey}:timestamp`);
        if (cached !== null && whenCached !== null) {
            let age = (Date.now() - whenCached) / 1000;
            if (age < expiration) {
                return eval(cached);
            } else {
                localStorage.removeItem(cacheKey);
                localStorage.removeItem(`${cacheKey}:timestamp`);
            }
        }

        fetch(url, options)
            .then((response) => {
                console.log(`response.status:`, response.status);
                if (response.status === 200) {
                    let contentType = response.headers.get('Content-Type');
                    if (contentType && (contentType.match(/application\/json/i) ||
                    contentType.match(/text\//i))) {
                        response.clone().text().then((content) => {
                            localStorage.setItem(cacheKey, content);
                            localStorage.setItem(`${cacheKey}:timestamp`, Date.now());
                        });
                    }
                }
                return response;
            }
        )
    }

    subscriberRegistration() {
        const GithubJobsListings = this.shadowRoot.querySelector('github-jobs-listings');

        this.observer.register(GithubJobsListings);
    }

    getListingData() {
        console.log('Executing getListingData()');
        const options = {
            seconds: 60 * 60 * 12,
            method: "GET",
            mode: "cors"
        }
        let theData = this.cachedFetch(this.getAttribute('apiURL'), options);
        this.setEvent('data-fetched', theData);
    }

    setEvent(newEvent, theData) {
        console.log('Setting a new event via setEvent()');
        this.event = newEvent;
        this.observer.publish(this.getEvent(), theData);
    }

    getEvent() {
        return this.event;
    }
}

if (!window.customElements.get('github-jobs-app')) {
    window.customElements.define('github-jobs-app', GithubJobsApp);
}