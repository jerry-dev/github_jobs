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
        this.css();
    }

    html() {
        this.shadowRoot.innerHTML += `
            <div class="listingPreviewInnerContainer">
                ${this.logoManager()}
                <span class="metaDataContainer">
                    <small class="metaData">${this.createdAt()} .</small>
                    <small class="metaData">${this.getAttribute('employmentType')}</small>
                </span>
                <h3 class="positionTitle">${this.getAttribute('positionTitle')}</h3>
                <span class="metaData">${this.getAttribute('companyName')}</span>
                <h4 class="location">${this.getAttribute('jobLocation')}</h4>
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
                    width: 100%;
                }

                .listingPreviewInnerContainer {
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

                .metaDataContainer {
                    margin-bottom: 16px;
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

                .location {
                    color: var(--blue-1);
                    font-size: var(--h4-size);
                    line-height: var(--h4-height);
                    margin-top: 44px;
                }
            </style>
        `;
    }

    createdAt() {
        const creation = new Date(Number(this.getAttribute('createdAt')));
        const milliSeconds = new Date().getTime() - creation.getTime();
        const minutes = Math.floor(milliSeconds/1000/60);
        const hours = Math.floor(milliSeconds/1000/60/60);
        const days = Math.floor(milliSeconds/1000/60/60/24);
        const weeks = Math.floor(milliSeconds/1000/60/60/24/7);
        const months = Math.floor(milliSeconds/1000/60/60/24/7/4);

        if (hours < 1) {
            return `${minutes}mi ago`;
        } else if (days < 1) {
            return `${hours}h ago`;
        } else if (weeks < 1) {
            return `${days}d ago`;
        } else if (months < 1) {
            return `${weeks}w ago`;
        } else if (months >= 1) {
            return `${months}mo ago`;
        }
    }

    logoManager() {
        if (this.getAttribute('companyLogo') === 'null') {
            return `<img rel="icon" src="../../src/assets/icons/desktop/dev-svgrepo-com.svg">`;
        } else {
            return `<img rel="icon" src=${this.getAttribute('companyLogo')}>`;
        }
    }
}

window.customElements.define('github-job-listing-preview', GithubJobListingPreview);