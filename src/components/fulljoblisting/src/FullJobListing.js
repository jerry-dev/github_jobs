import CompanyHeader from '../../companyheader/src/CompanyHeader.js';
import JobDetails from '../../jobdetails/src/JobDetails.js';

export default class FullJobListing extends HTMLElement {
    static get observedAttributes() {
        return [ 'companyLogo, companyName, companyURL, createdAt, employmentType, positionTitle, jobLocation, howToApply, jobDescription' ];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
		if (oldValue !== newValue) {
			this[attrName] = this.getAttribute(attrName);
		}
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.html();
        this.css();
    }

    html() {
        this.shadowRoot.innerHTML += `
            <company-header
                companyLogo="${this.getAttribute('companyLogo')}"
                companyName="${this.getAttribute('companyName')}"
                companyURL="${this.getAttribute('companyURL')}"
            ></company-header>

            <job-details
                companyURL="${this.getAttribute('companyURL')}"
                createdAt="${this.getAttribute('createdAt')}"
                employmentType="${this.getAttribute('employmentType')}"
                positionTitle="${this.getAttribute('positionTitle')}"
                jobLocation="${this.getAttribute('jobLocation')}"
                howToApply="${this.getAttribute('howToApply')}"
                jobDescription="${this.getAttribute('jobDescription')}"
            ></job-details>
        `;
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
                    display: flex;
                    flex-direction: column;
                    width: 65.765%;
                    margin-left: auto;
                    margin-right: auto;
                }

                company-header {
                    margin-bottom: 32px;
                }

            </style>
        `;
    }

    tabletLayoutCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 879px) {
                    :host {
                        width: 100%;
                    }
                }
            </style>
        `;
    }

    mobileLayoutCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 375px) {
                    company-header {
                        margin-bottom: 24px;
                    }
                }
            </style>
        `;
    }
}

if (!window.customElements.get('full-job-listing')) {
    window.customElements.define('full-job-listing', FullJobListing)
}