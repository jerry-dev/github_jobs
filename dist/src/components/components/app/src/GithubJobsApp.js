import AppHeader from '../../appheader/src/AppHeader.js';
import GithubJobsListings from '../../githubjobslistings/src/GithubJobsListings.js';
import FullJobListing from '../../fulljoblisting/src/FullJobListing.js';
import eventBus from '../../../utils/EventBus.js';
import Navigo from '../../../utils/navigo.es.js';

class GithubJobsApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.name = 'github-jobs-app';
        this.interests = [
            'load-more',
            'filter-search',
            'listing-clicked',
            'dark-theme-activated',
            'dark-theme-deactivated',
            'navigate-to-root'
        ];
        
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
        this.shadowRoot.innerHTML = `
            <div id="appOuterContainer">
                <div id="appInnerContainer">
                <app-header></app-header>
                <div id="route">
                </div>
            </div>
        `;
    }

    css() {
        this.shadowRoot.innerHTML += `
        <style>
            :host {
                display: block;
                min-height: 100%;
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
        this.observer.register(this);
    }

    routerInit() {
        this.route = this.shadowRoot.querySelector('#route');
        this.router = new Navigo(window.location.origin, { hash: true });

        this.router.on(
            "/", () => {
                    this.route.innerHTML = `<github-jobs-listings ${this.darkThemeSync()} listingsPreviewsPerPage=12></github-jobs-listings>`;
                    this.getListingData();
                });

        this.router.on("/selectedListing", () => {
                const details = JSON.parse(sessionStorage.getItem('details'));
                    this.route.innerHTML =
                        `<full-job-listing ${this.darkThemeSync()}
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
        );
        this.router.resolve();
    }

    cachedFetch(url, options) {
        // Expires in two hours
        let expiration = 60 * 60 * 2;

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
        let whenCached = localStorage.getItem(`${cacheKey}:timestamp`);

        (!cached)
            ? console.log(`The data is not from the local cache`)
            : console.log(`The data came from the local cache`);
        
        if (cached !== null && whenCached !== null) {
            if (options.loadMore || options.search) {
                return eval(cached);
            }
            let age = (Date.now() - whenCached) / 1000;
            if (age < expiration) {
                return eval(cached);
            } else {
                console.log(`The data has reached it's expiration date.`);
                console.log(`Removing the data from local cache.`);
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
                            console.log(`Saving the fetched data to the local cache.`);
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
            // Expires in seven hours
            seconds: 60 * 60 * 7,
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }

        let theData = this.cachedFetch("https://fast-anchorage-00022.herokuapp.com/", options);
        this.observer.publish('data-fetched', theData);
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
                this.teleportToTheTop()
                sessionStorage.setItem('details', JSON.stringify(theData));
                this.router.navigate('/selectedListing');
                break;
            case 'dark-theme-activated':
                this.activateDarkTheme();
                break;
            case 'dark-theme-deactivated':
                this.deactivateDarkTheme()
                break;
            case 'navigate-to-root':
                this.router.navigate();
                this.getListingData();
        }
    }

    loadMore() {
        const options = {
            loadMore: true
        }
        let theData = this.cachedFetch("https://fast-anchorage-00022.herokuapp.com/", options);
        this.observer.publish('loaded-more', theData);
    }

    filterSearch(filterCriteria) {
        const options = {
            search: true
        }
        let theData = this.cachedFetch("https://fast-anchorage-00022.herokuapp.com/", options);
        theData.filterCriteria = filterCriteria;
        this.observer.publish('filter-searched', theData);
    }

    teleportToTheTop() {
        const route = this.shadowRoot.querySelector('#route');
        window.scroll({
            top: route,
            behavior: "auto"
        });
    }

    activateDarkTheme() {
        this.classList.add('darktheme');
        this.parentNode.classList.add('darktheme');
    }

    deactivateDarkTheme() {
        this.classList.remove('darktheme');
        this.parentNode.classList.remove('darktheme');
    }

    darkThemeSync() {
        if (this.classList.contains('darktheme')) {
            return `class="darktheme"`;
        }
    }
}

if (!window.customElements.get('github-jobs-app')) {
    window.customElements.define('github-jobs-app', GithubJobsApp);
}