export default class GithubJobsListings extends HTMLElement {
    static get observedAttributes() {
        return ['listingsPreviewsPerPage'];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.name = 'github-jobs-listings';
        this.interests = ['listingDataAvailable'];
    }

    

    connectedCallback() {
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

    notificationReceiver(name, interest, newValue) {
        console.log(`${this.getName()} has received the notification.`);
        console.log(`The data received:`, {name, interest, newValue});

        if (interest === 'listingDataAvailable') {
            switch (newValue) {
                case 'true':
                case true:
                    this.render();
                    break;
            }
        }
    }

    render() {
        this.html();
    }

    html() {
        let markup = ``;
        for (let i = 0; i < this.getAttribute('listingsPreviewsPerPage'); i++) {
            markup += `<github-job-listing-preview
                listingAge=""
                employmentType=""
                positionTitle=""
                companyName=""
                jobLocation=""
                companyLogo=""
            ></github-job-listing-preview>`;
        }

        this.shadowRoot.innerHTML = markup;
    }
}

if (!window.customElements.get('github-jobs-listings')) {
    window.customElements.define('github-jobs-listings', GithubJobsListings)
}