import FilterForm from '../../filterform/src/FilterForm.js';
import GithubJobListingPreview from '../../githubjoblistingpreview/src/GithubJobListingPreview.js';
import LoadMoreButton from '../../loadmorebutton/src/LoadMoreButton.js';

export default class GithubJobsListings extends HTMLElement {
    static get observedAttributes() {
        return ['listingsPreviewsPerPage'];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.name = 'github-jobs-listings';
        this.interests = ['data-fetched'];
    }

    getName() {
        return this.name;
    }

    getInterests() {
        return this.interests;
    }

    addInterests(newInterest) {
        this.interests[this.interests.length] = newInterest;
    }

    notificationReceiver(name, interest, theData) {
        console.log(`${name} has received the notification.`);
        console.log(`The event "${interest}" took place.`);

        switch (interest) {
            case 'data-fetched':
                this.render(theData);
                break;
        }
    }

    render(theData) {
        this.html(theData);
        this.css();
        this.scripts();
    }

    html(theData) {
        let markup = ``;
        const numberOfListings = this.getAttribute('listingsPreviewsPerPage');

        for (let i in theData) {
            if (i === numberOfListings) {
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
        }

        this.shadowRoot.innerHTML += `
            <filter-form></filter-form>
            <div id="jobListingsInnerContainer">
                ${markup}
            </div>
            <load-more-button></load-more-button>
        `;
    }

    css() {
        this.defaultCSS();
        this.tabletLayoutCSS();
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

        `;
    }

    scripts() {
        this.listingClickEvent();
    }

    captureDetails(event) {
        // PASS LISTING DETAILS TO THE LISTING COMPONENT VIA EVENT BUS
        const details = {};
        details.companyLogo = event.target.getAttribute('companyLogo');
        details.companyName = event.target.getAttribute('companyName');
        details.companyURL = event.target.getAttribute('companyURL');
        details.createdAt = event.target.getAttribute('createdAt');
        details.employmentType = event.target.getAttribute('employmentType');
        details.positionTitle = event.target.getAttribute('positionTitle');
        details.jobDescription = event.target.getAttribute('jobDescription');
        details.howToApply = event.target.getAttribute('howToApply');
        console.log(details)
    }

    listingClickEvent() {
        this.shadowRoot.querySelector('#jobListingsInnerContainer').addEventListener('click', (event) => {
            event.preventDefault();
            const { tagName } = event.target;

            switch (tagName) {
                case 'GITHUB-JOB-LISTING-PREVIEW':
                    this.captureDetails(event);
                    break;
            }
        });
    }
}

if (!window.customElements.get('github-jobs-listings')) {
    window.customElements.define('github-jobs-listings', GithubJobsListings)
}