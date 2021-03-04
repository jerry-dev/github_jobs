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
    // "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa1NiIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--54bd1a2ac1ebe3d27fb5f6f5019770aec25d5c87/last%20ned.png"

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
            <div id="jobListingsInnerContainer">
                ${markup}
            </div>
            <load-more-button></load-more-button>
        `;
    }

    css() {
        this.defaultCSS();
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
                    width: 100%;
                }
            </style>
        `;
    }

    scripts() {
        this.listingClickEvent();
    }

    listingClickEvent() {
        this.shadowRoot.querySelector('#jobListingsInnerContainer').addEventListener('click', (event) => {
            console.log(event.target.id);
        });
    }
}

if (!window.customElements.get('github-jobs-listings')) {
    window.customElements.define('github-jobs-listings', GithubJobsListings)
}