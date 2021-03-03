import GithubJobListingPreview from '../../githubjoblistingpreview/src/GithubJobListingPreview.js';

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
    }

    html(theData) {
        let markup = ``;
        const numberOfListings = this.getAttribute('listingsPreviewsPerPage');

        for (let i in theData) {
            if (i === numberOfListings) {
                break;
            }
            
            markup += `<github-job-listing-preview
                id=${theData[i].id}
                employmentType=${theData[i].type}
                listingURL=${theData[i].url}
                createdAt=${theData[i].created_at}
                companyName=${theData[i].company}
                companyURL=${theData[i].company_url}
                jobLocation=${theData[i].location}
                positionTitle=${theData[i].title}
                jobDescription=${theData[i].description}
                howToApply=${theData[i].how_to_apply}
                companyLogo=${theData[i].company_logo}>
            </github-job-listing-preview>`;
            
            
        }

        this.shadowRoot.innerHTML += `
            <div id="jobListingsInnerContainer">
                ${markup}
            </div>
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
                    display: block;
                }

                #jobListingsInnerContainer {
                    display: grid;
                    grid-template-columns: repeat(3, 31.531%);
                    grid-auto-rows: 253px;
                }

            </style>
        `;
    }
}

if (!window.customElements.get('github-jobs-listings')) {
    window.customElements.define('github-jobs-listings', GithubJobsListings)
}