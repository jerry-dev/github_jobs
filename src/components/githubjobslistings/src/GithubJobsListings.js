import FilterForm from '../../filterform/src/FilterForm.js';
import GithubJobListingPreview from '../../githubjoblistingpreview/src/GithubJobListingPreview.js';
import LoadMoreButton from '../../loadmorebutton/src/LoadMoreButton.js';
import eventBus from '../../../utils/EventBus.js';

export default class GithubJobsListings extends HTMLElement {
    static get observedAttributes() {
        return ['listingsPreviewsPerPage'];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.name = 'github-jobs-listings';
        this.interests = ['data-fetched', 'loaded-more', 'filter-searched'];
        this.currentNumberOfBuckets = 0;
        this.numberOfListingsShown = 0;
        this.observer = eventBus;
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
            case 'data-fetched':
                this.render(theData);
                break;
            case 'loaded-more':
                this.loadMore(theData);
                break;
            case 'filter-searched':
                this.html(theData, true);
                break;
        }
    }

    render(theData) {
        this.html(theData);
        this.css();
        this.scripts();
    }

    html(theData, shouldFilter = false) {
        let filterCriteria = this.extractFilterCriteria(shouldFilter, theData);
        delete theData.filterCriteria;

        let markup = ``;
        const numberOfListings = this.getAttribute('listingsPreviewsPerPage');

        for (let i in theData) {
            if (i === numberOfListings) {
                break;
            }

            if (shouldFilter) {
                this.shadowRoot.querySelector('#jobListingsInnerContainer').innerHTML =``;
                if (filterCriteria.location &&
                    !theData[i].location.toLowerCase().includes( filterCriteria.location.toLowerCase() )){
                    continue;
                }

                if (filterCriteria.description &&
                    !theData[i].description.toLowerCase().includes( filterCriteria.description.toLowerCase() )){
                    continue;
                }

                if (filterCriteria.type && !theData[i].type.toLowerCase().includes('full time')){
                    continue;
                }
            }

            markup += `<github-job-listing-preview
                companyLogo="${theData[i].company_logo}"
                id="${theData[i].id}"
                employmentType="${theData[i].type}"
                listingURL="${theData[i].url}"
                createdAt="${new Date(theData[i].created_at).getTime()}"
                companyName="${theData[i].company}"
                companyURL="${theData[i].company_url}"
                jobLocation="${theData[i].location}"
                positionTitle="${theData[i].title}"
                jobDescription="${theData[i].description}"
                howToApply="${theData[i].how_to_apply}"
                >
            </github-job-listing-preview>`;

            this.numberOfListingsShown++;
        }

        if (shouldFilter) {
            this.shadowRoot.querySelector('#jobListingsInnerContainer').innerHTML += markup;
        } else {
            this.shadowRoot.innerHTML += `
            <filter-form></filter-form>
            <div id="jobListingsInnerContainer">
                ${markup}
            </div>
            <load-more-button></load-more-button>`;
        }
        
        this.currentNumberOfBuckets++;
    }

    css() {
        this.defaultCSS();
        this.tabletLayoutCSS();
        this.mobileLayoutCSS();
    }

    defaultCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after { padding: 0; margin: 0; }

                :host {
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }

                #jobListingsInnerContainer {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-column-gap: 30px;
                    grid-row-gap: 65px;
                    margin-bottom: 56px;
                    margin-top: 105px;
                    width: 100%;
                }
            </style>
        `;
    }

    tabletLayoutCSS() {
        this.shadowRoot.innerHTML += `
        <style>
            @media screen and (max-width: 768px) {
                #jobListingsInnerContainer {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    grid-column-gap: 11px;
                    margin-top: 70px;
                }
            }
        </style>
        `;
    }

    mobileLayoutCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 375px) {
                    #jobListingsInnerContainer {
                        display: grid;
                        grid-template-columns: 1fr;
                        margin-top: 49px;
                    }
                }
            </style>
        `;
    }

    scripts() {
        this.clickEvents();
    }

    captureDetails(event) {
        const details = {};
        details.companyLogo = event.target.getAttribute('companyLogo');
        details.companyName = event.target.getAttribute('companyName');
        details.companyURL = event.target.getAttribute('companyURL');
        details.createdAt = event.target.getAttribute('createdAt');
        details.employmentType = event.target.getAttribute('employmentType');
        details.positionTitle = event.target.getAttribute('positionTitle');
        details.jobDescription = event.target.getAttribute('jobDescription');
        details.howToApply = event.target.getAttribute('howToApply');

        // PUBLISH THE EVENT WITH THE DETAILS DATA
        // THE ROOT COMPONENT WILL HAVE THIS EVENT AS AN INTEREST
        // THEN ROOT COMPONENT WILL LOAD IN THE LISTING COMPONENT WITH THE DETAILS DATA
        console.log(details)
    }

    extractFilterCriteria(toFilter, data) {
        if (toFilter) {
            const { filterCriteria } = data;
            return filterCriteria;
        } else {
            return;
        }
    }

    clickEvents() {
        this.shadowRoot.addEventListener('click', (event) => {
            event.preventDefault();
            const { tagName } = event.target;

            switch (tagName) {
                case 'GITHUB-JOB-LISTING-PREVIEW':
                    // Invoked a method that:
                    // 1. Caputures the data via captrueDetails(event)
                    // 2. Publish the "LISTING SELECTED" event/topic with the captured data
                    // 3. The root app is interested in the "LISTING SELECTED" event
                    // 4. The root app loads in the listing component in the route
                    // 5. The root app passes the captured data to the listing component
                    this.captureDetails(event);
                    break;
                case 'LOAD-MORE-BUTTON':
                    this.observer.publish('load-more');
                    break;
            }
        });
    }

    loadMore(theData) {
        console.log('Executing the loadMore() method');
        let markup = ``;
        const numberOfListings = this.getAttribute('listingsPreviewsPerPage');

        const startingAt = (this.currentNumberOfBuckets * numberOfListings);

        for (let i in theData) {
            if (this.numberOfListingsShown >= 50) {
                console.log(`Showing ${this.numberOfListingsShown} listings`);
                this.shadowRoot.querySelector('load-more-button').style.display = 'none';
                break;
            }

            if (i === 0) {
                i = startingAt;
            }

            if (i === numberOfListings) {
                console.log(`Showing ${this.numberOfListingsShown} listings`);
                break;
            }

            markup += `<github-job-listing-preview
                companyLogo="${theData[i].company_logo}"
                id="${theData[i].id}"
                employmentType="${theData[i].type}"
                listingURL="${theData[i].url}"
                createdAt="${new Date(theData[i].created_at).getTime()}"
                companyName="${theData[i].company}"
                companyURL="${theData[i].company_url}"
                jobLocation="${theData[i].location}"
                positionTitle="${theData[i].title}"
                jobDescription="${theData[i].description}"
                howToApply="${theData[i].how_to_apply}"
                >
            </github-job-listing-preview>`;

            this.numberOfListingsShown++;
        }

        this.shadowRoot.querySelector('#jobListingsInnerContainer').innerHTML += markup;
        this.currentNumberOfBuckets++;
    }

    setEvent(newEvent, theData) {
        console.log('Setting a new event via setEvent()');
        this.event = newEvent;
        this.observer.publish(this.getEvent(), theData);
    }
}

if (!window.customElements.get('github-jobs-listings')) {
    window.customElements.define('github-jobs-listings', GithubJobsListings)
}