import AppHeader from '../../appheader/src/AppHeader.js';
import GithubJobsListings from '../../githubjobslistings/src/GithubJobsListings.js';
import FullJobListing from '../../fulljoblisting/src/FullJobListing.js';
import eventBus from '../../../utils/EventBus.js';
import Navigo from '../../../utils/navigo.es.js';

class GithubJobsApp extends HTMLElement {
    static get observedAttributes() {
        return ['apiURL'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
		if (oldValue !== newValue) {
			this[attrName] = this.getAttribute(attrName);
		}
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.name = 'github-jobs-app';
        this.interests = ['load-more', 'filter-search', 'listing-clicked'];
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
                    <div id="route">
                        <github-jobs-listings listingsPreviewsPerPage=12>
                        </github-jobs-listings>
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
        this.observer.register(this);

        // The dynamic component needs to be 
        this.observer.register(this.shadowRoot.querySelector('github-jobs-listings'));
        this.routerInit();
        this.getListingData();
    }

    routerInit() {
        this.route = this.shadowRoot.querySelector('#route');

        this.router = new Navigo(window.location.origin, true, '#!');

        this.router
            .on({
                "/listings": () => this.route.innerHTML = `<github-jobs-listings
                    listingsPreviewsPerPage=12
                ></github-jobs-listings>`,
                "/selectedListing": () => {
                    const details = JSON.parse(sessionStorage.getItem('details'));

                    this.route.innerHTML +=
                        `<full-job-listing
                            companyLogo="${details.companyLogo}"
                            companyName="${details.companyName}"
                            companyURL="${details.companyURL}"
                            createdAt="${details.createdAt}"
                            employmentType="${details.employmentType}"
                            positionTitle="${details.positionTitle}"
                            jobLocation="${details.jobLocation}"
                            howToApply='${details.howToApply}'
                            jobDescription="${details.jobDescription}"
                            >
                        </full-job-listing>`;
                }
            });

            this.router.resolve();
    }

    cachedFetch(url, options) {
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
            if (options.loadMore || options.search) {
                return eval(cached);
            }
            let age = (Date.now() - whenCached) / 1000;
            if (age < expiration) {
                // console.log(cached);
                return eval(cached);
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
                        });
                    }
                }
                return response;
            }
        )
    }

    getListingData() {
        const options = {
            seconds: 60 * 60 * 12,
            headers: new Headers({
                "Access-Control-Allow-Origin": "*"
            })
        }

        let theData = this.cachedFetch(this.getAttribute('apiURL'), options);
        this.setEvent('data-fetched', theData);
    }

    setEvent(newEvent, theData) {
        this.event = newEvent;
        this.observer.publish(this.getEvent(), theData);
    }

    getEvent() {
        return this.event;
    }

    getName() {
        return this.name;
    }

    getInterests() {
        return this.interests;
    }

    notificationReceiver(name, interest, theData) {
        console.log(`${name} has received the notification.`);
        console.log(`The event "${interest}" took place.`);

        switch (interest) {
            case 'load-more':
                this.loadMore();
                break;
            case 'filter-search':
                this.filterSearch(theData);
                break;
            case 'listing-clicked':
                sessionStorage.setItem('details', JSON.stringify(theData));
                this.router.navigate('/selectedListing');
        }
    }

    loadMore() {
        const options = {
            loadMore: true
        }
        let theData = this.cachedFetch(this.getAttribute('apiURL'), options);
        this.setEvent('loaded-more', theData);
    }

    filterSearch(filterCriteria) {
        const options = {
            search: true
        }
        let theData = this.cachedFetch(this.getAttribute('apiURL'), options);
        theData.filterCriteria = filterCriteria;
        this.setEvent('filter-searched', theData);
    }
}

if (!window.customElements.get('github-jobs-app')) {
    window.customElements.define('github-jobs-app', GithubJobsApp);
}