import createdAt from '../../../utils/createdAt.js';
import logoManager from '../../../utils/logoManager.js';

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
        console.log(this.getAttribute('jobLocation'));
    }

    render() {
        this.html();
        this.css();
    }

    html() {
        this.shadowRoot.innerHTML += `
            <div class="listingPreviewInnerContainer">
                <section id="top">
                    ${logoManager(this.getAttribute('companyLogo'))}
                    <span class="metaDataContainer">
                        <small class="metaData">${createdAt(this.getAttribute('createdAt'))} .</small>
                        <small class="metaData">${this.getAttribute('employmentType')}</small>
                    </span>
                    <h3 class="positionTitle">${this.getAttribute('positionTitle')}</h3>
                    <span class="metaData">${this.getAttribute('companyName')}</span>
                </section>
                <section id="bottom">
                    <h4 class="jobLocation">${this.getAttribute('jobLocation')}</h4>
                </section>
            </div>
        `;
    }

    css() {
        this.defaultCSS();
    }

    defaultCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after { margin: 0; padding: 0; }

                :host {
                    background-color: var(--white);
                    cursor: pointer;
                    display: block;
                    height: 100%;
                    width: 100%;
                }

                .listingPreviewInnerContainer {
                    display: flex;
                    flex-direction: column;
                    height: 168PX;
                    justify-content: space-between;
                    margin-bottom: 32px;
                    margin-left: auto;
                    margin-right: auto;
                    margin-top: 49px;
                    position: relative;
                    width: 81.714%;
                }

                img {
                    height: 50px;
                    position: absolute;
                    top: -75px;
                    width: 50px;
                }

                .metaData {
                    color: var(--dark-grey);
                    font-size: var(--font-size-1);
                }

                .positionTitle {
                    color: var(--very-dark-blue);
                    font-size: var(--h3-size: 20px);
                    line-height: var(--h3-height);
                    margin-bottom: 17px;
                    margin-top: 16px;
                }

                .positionTitle:hover {
                    color: var(--dark-grey);
                }

                .jobLocation {
                    color: var(--blue-1);
                    font-size: var(--h4-size);
                    line-height: var(--h4-height);
                }
            </style>
        `;
    }
}

window.customElements.define('github-job-listing-preview', GithubJobListingPreview);