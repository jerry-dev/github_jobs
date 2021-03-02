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
        this.listingData = [];
        this.observer = eventBus;

    }

    connectedCallback() {
        const options = {
            seconds: 15 * 60,
        }
        this.cachedFetch(this.getAttribute('apiURL'), options);
        this.render();
        this.routerInit();
        this.subscriberRegistration();
    }

    render() {
        this.html();
        this.css();
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

    routerInit() {
        const route = this.shadowRoot.querySelector('#route');

        const router = new Navigo(window.location.origin);

        router
            .on({
                "/listings": () => route.innerHTML = `<github-jobs-listings
                    listingsPreviewsPerPage=12
                ></github-jobs-listings>`,
                "/selectedListing": () => route.innerHTML = `<dev-job-listing></dev-job-listing>`
            });
    }

    cachedFetch(url, options) {
        let expiration = 15 * 60;

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
                let response = new Response(new Blob([cached]));
                return Promise.resolve(response);
            } else {
                localStorage.removeItem(cacheKey);
                localStorage.removeItem(`${cacheKey}:timestamp`);
            }
        }

        fetch(url, options)
            .then((response) => {
                if (response.status === 200) {
                    let contentType = response.headers.get('Content-Type');
                    if (contentType && (contentType.match(/application\/json/i) ||
                    contentType.match(/text\//i))) {
                        response.clone().text().then((content) => {
                            localStorage.setItem(cacheKey, content);
                            localStorage.setItem(`${cacheKey}:timestamp`, Date.now());
                            console.log(localStorage.getItem(cacheKey));
                        });
                    }
                }
                return response;
            }
        )
    }

    subscriberRegistration() {
        // REGISTER THE SUBS ONE BY ONE HERE
    }

    setListingData(fetchedData) {
        this.listingData = fetchedData;
    }

    getListingData() {
        return this.listingData;
    }

    setEvent(newEvent) {
        this.event = newEvent;
        this.observer.publish(this.getEvent(), this.getListingData());
    }

    getEvent() {
        return this.event;
    }
}

if (!window.customElements.get('github-jobs-app')) {
    window.customElements.define('github-jobs-app', GithubJobsApp);
}