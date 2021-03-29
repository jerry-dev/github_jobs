import FilterForm from '../../filterform/src/FilterForm.js';
import GithubJobListingPreview from '../../githubjoblistingpreview/src/GithubJobListingPreview.js';
import LoadMoreButton from '../../loadmorebutton/src/LoadMoreButton.js';
import eventBus from '../../../utils/EventBus.js';

export default class GithubJobsListings extends HTMLElement {
    static get observedAttributes() {
        return ['listingsPreviewsPerPage'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
		if (oldValue !== newValue) {
			this[attrName] = this.getAttribute(attrName);
		}
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.name = 'github-jobs-listings';
        this.interests = [
            'data-fetched',
            'loaded-more',
            'filter-searched',
            'dark-theme-activated',
            'dark-theme-deactivated'
        ];
        this.currentNumberOfBuckets = 0;
        this.numberOfListingsShown = 0;
        this.listingsShownById = [];
        this.observer = eventBus;
    }

    connectedCallback() {
        this.observer.register(this);
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
                this.loadMore(theData, true);
                break;
            case 'filter-searched':
                console.log(`GHJobsListing case: filter-searched`);
                this.html(theData, true);
                break;
            case 'dark-theme-activated':
                this.activateDarkTheme();
                break;
            case 'dark-theme-deactivated':
                this.deactivateDarkTheme();
                break;
        }
    }

    render(theData) {
        this.html(theData);
        this.css();
        this.scripts();
    }

    html(theData, shouldFilter = false) {
        if (this.numberOfListingsShown > 0) {
            this.currentNumberOfBuckets = 0;
            this.numberOfListingsShown = 0;
            this.listingsShownById = [];
        }

        let markupLength = 0;
        this.bringBackLoadMoreButton();

        this.filterCriteria = this.extractFilterCriteria(shouldFilter, theData);
        theData.filterCriteria;

        let markup = ``;
        
        for (let i = 0; i < 50; i++) {
            if (markupLength === 12) {
                break;
            }

            let loopCommands = {};

            if (shouldFilter && this.filterCriteria) {
                loopCommands.toSkip = this.criteriaFilter(theData[i], this.filterCriteria);
            }

            if (loopCommands.toSkip) {
                continue;
            } else if (!loopCommands.toSkip) {
                markup +=
                `<github-job-listing-preview
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
                    howToApply='${theData[i].how_to_apply}'
                    >
                </github-job-listing-preview>`;

            this.listingsShownById[this.listingsShownById.length] = theData[i].id;
            
            markupLength++;
            this.numberOfListingsShown++;
            }
        }

        if (!shouldFilter) {
            this.shadowRoot.innerHTML = `
                <filter-form ${this.darkThemeClassManager()}></filter-form>
                <div id="jobListingsInnerContainer">
                    ${markup}
                </div>
                <load-more-button></load-more-button>`;
            
                this.currentNumberOfBuckets++;
        } else if (shouldFilter) {
            this.clearListingContainer();
            this.shadowRoot.querySelector('#jobListingsInnerContainer').innerHTML = markup;
            this.currentNumberOfBuckets++;
        }

        this.darkThemeSync();
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

    bringBackLoadMoreButton() {
        setTimeout(() => {
            const loadMoreButton = this.shadowRoot.querySelector('load-more-button');
            if (loadMoreButton.style.display === 'none') {
                loadMoreButton.style.display = 'block';
            }
        }, 1);
    }

    scripts() {
        this.clickEvents();
        this.loadListingAnimation();
    }

    captureAndPublish(event) {
        const details = {};
        
        details.companyLogo = event.target.getAttribute('companyLogo');
        details.companyName = event.target.getAttribute('companyName');
        details.companyURL = event.target.getAttribute('companyURL');
        details.createdAt = event.target.getAttribute('createdAt');
        details.employmentType = event.target.getAttribute('employmentType');
        details.positionTitle = event.target.getAttribute('positionTitle');
        details.jobDescription = event.target.getAttribute('jobDescription');
        details.howToApply = event.target.getAttribute('howToApply');
        details.jobLocation = event.target.getAttribute('jobLocation');
        
        this.observer.publish('listing-clicked', details);
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
                    this.captureAndPublish(event);
                    break;
                case 'LOAD-MORE-BUTTON':
                    this.observer.publish('load-more');
                    break;
            }
        });
    }

    loadMore(theData, shouldFilter = false) {
        let markup = ``;

        const listingPerPage = Number(this.getAttribute('listingsPreviewsPerPage'));

        const startingAt = this.numberOfListingsShown;
        let markupLength = 0;

        for (let i = startingAt; markupLength !== listingPerPage; i++) {
            if (this.numberOfListingsShown >= 50 || i >= 50) {
                this.removeLoadMoreButton();
                break;
            }

            let loopCommands = {};

            if (shouldFilter && this.filterCriteria) {
                loopCommands.toSkip = this.criteriaFilter(theData[i], this.filterCriteria);
            }

            if (loopCommands.toSkip) {
                continue;
            }

            if (this.alreadyShowing(this.listingsShownById, theData[i].id)) {
                continue;
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
                howToApply='${theData[i].how_to_apply}'
                >
            </github-job-listing-preview>`;

            this.listingsShownById[this.listingsShownById.length] = theData[i].id;
            markupLength++;
            this.numberOfListingsShown++;
        }

        this.shadowRoot.querySelector('#jobListingsInnerContainer').innerHTML += markup;
        this.darkThemeSync();
        this.currentNumberOfBuckets++;
    }

    criteriaFilter(theData, filterCriteria) {
        if (!filterCriteria.location && !filterCriteria.description && !filterCriteria.type) {
            return false;
        }

        if (filterCriteria.location && !theData.location.toLowerCase().includes( filterCriteria.location.toLowerCase() )){
            return true;
        }


        if (filterCriteria.description &&
            !theData.description.toLowerCase().includes( filterCriteria.description.toLowerCase() ) &&
            !theData.title.toLowerCase().includes( filterCriteria.description.toLowerCase() ) &&
            !theData.company.toLowerCase().includes( filterCriteria.description.toLowerCase() )
            ){
            return true;
        }


        if (filterCriteria.type && !theData.type.toLowerCase().includes('full time')){
            return true;
        }

        return false;
    }

    alreadyShowing(collection, id) {
        if (collection.includes( id )) {
            return true;
        }
    }

    clearListingContainer() {
        this.shadowRoot.querySelector('#jobListingsInnerContainer').innerHTML = ``;
    }

    removeLoadMoreButton() {
        this.shadowRoot.querySelector('load-more-button').style.display = 'none';
    }

    loadListingAnimation() {
        const listings = this.shadowRoot.querySelectorAll('github-job-listing-preview');
        for (let i = 0; i < listings.length; i++) {
            listings[i].animate([
            {
                opacity: 0,
                transform: "scale(0)"
            },
            {
                opacity: 1,
                transform: "scale(1)"
            }
        ], eval(`${i+3}00`));
        }
    }

    activateDarkTheme() {
        this.classList.add('darktheme');
        const previews = this.shadowRoot.querySelectorAll('github-job-listing-preview');

        for (let i = 0; i < previews.length; i++) {
            previews[i].classList.add('darktheme');
        }
    }

    deactivateDarkTheme() {
        this.classList.remove('darktheme');
        const previews = this.shadowRoot.querySelectorAll('github-job-listing-preview');

        for (let i = 0; i < previews.length; i++) {
            previews[i].classList.remove('darktheme');
        }
    }

    darkThemeSync() {
        if (this.classList.contains('darktheme')) {
            this.activateDarkTheme();
        }
    }

    darkThemeClassManager() {
        if (this.classList.contains('darktheme')) {
            return `class="darktheme"`;
        }
    }
}

if (!window.customElements.get('github-jobs-listings')) {
    window.customElements.define('github-jobs-listings', GithubJobsListings)
}