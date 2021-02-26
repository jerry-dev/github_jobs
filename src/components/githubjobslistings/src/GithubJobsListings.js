export default class GithubJobsListings extends HTMLElement {
    static get observedAttributes() {
        return ['listingsPreviewsPerPage, apiKey'];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const dataAvailable = this.dataAvailable;

        switch (dataAvailable) {
            case 'false':
            case false:
                this.fetchData();
            case 'true':
            case true:
                this.html();
        }
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