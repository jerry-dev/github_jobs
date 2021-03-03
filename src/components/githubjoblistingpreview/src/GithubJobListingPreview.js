export default class GithubJobListingPreview extends HTMLElement {
    static get observedAttributes() {
        return ['id, employmentType, listingURL, createdAt, companyName, companyURL, jobLocation, positionTitle, jobDescription, howToApply, companyLogo'];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[attrName] = this.getAttribute(attrName);
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.html();
    }

    html() {
        this.shadowRoot.innerHTML += `
            <div id="listingPreviewInnerContainer">
                <p>${this.getAttribute('employmentType')}</p>
                <p>${this.getAttribute('createdAt')}</p>
                <p>${this.getAttribute('companyName')}</p>
                <p>${this.getAttribute('jobLocation')}</p>
                <p>${this.getAttribute('positionTitle')}</p>
                <p>${this.getAttribute('companyLogo')}</p>
            </div>
        `;
    }
}

window.customElements.define('github-job-listing-preview', GithubJobListingPreview)