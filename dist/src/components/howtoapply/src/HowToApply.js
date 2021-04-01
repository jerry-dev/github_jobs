export default class HowToApply extends HTMLElement {
    static get observedAttributes() {
        return ['howToApply, companyURL, jobLocation, companyName'];
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
            <div class="componentInnerContainer">
                <h3>How To Apply</h3>

                <div>
                   ${this.howToApplyManager()}
                </div>
            </div>
        `;
    }


    css() {
        this.defaultCSS();
        this.mobileLayoutCSS();
    }

    defaultCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after { padding: 0; margin: 0; }

                :host {
                    background-color: var(--blue-1);
                    background-image: url('../src/assets/icons/desktop/bg-pattern-detail-footer.svg');
                    background-repeat: no-repeat;
                    background-position: center;
                    border-radius: 6px;
                    color: var(--white);
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }

                .componentInnerContainer {
                    height: auto;
                    margin-bottom: 41px;
                    margin-left: auto;
                    margin-right: auto;
                    margin-top: 40px;
                    width: 87.534%;
                    overflow-wrap: break-word;
                }

                .componentInnerContainer > h3 {
                    font-size: var(--h3-size);
                    line-height: 20px;
                    margin-bottom: 28px;
                }

                a {
                    color: var(--white);
                }

                .componentInnerContainer > div {
                    color: var(--white);
                    font-size: 16px;
                    text-decoration: none;
                    line-height: 26px;
                }
            </style>
        `;
    }

    mobileLayoutCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 375px) {
                    :host {
                        background-image: url('../src/assets/icons/mobile/bg-pattern-detail-footer.svg');
                    }
    
                    .componentInnerContainer {
                        margin-bottom: 32px;
                        margin-top: 32px;
                    }
                }
            </style>
        `;
    }

    isURLAvailable(attribute) {
        const url = this.getAttribute(attribute);

        switch (url) {
            case null:
            case 'null':
            case undefined:
            case 'undefined':
                return false;
            default:
                if (url.length > 9) {
                    return true;
                } else {
                    return false;
                }
        }
    }

    isLocationAndCompanyNameAvailable() {
        if (this.getAttribute('companyName') && this.getAttribute('jobLocation')) {
            return true;
        }
    }

    howToApplyManager() {
        if (this.isURLAvailable('howToApply')) {
            return this.getAttribute('howToApply');
        } else if (!this.isURLAvailable('howToApply') && this.isURLAvailable('companyURL')) {
            return this.getAttribute('companyURL');
        } else if (!this.isURLAvailable('howToApply') && !this.isURLAvailable('companyURL') && this.isLocationAndCompanyNameAvailable()) {
            return `The source did not provide any valid links. Do a web search for "${this.getAttribute('companyName')}, ${this.getAttribute('jobLocation')}" to find additional information.`;
        } else {
            return `Please disregard this job listing. There are too many details missing.`;
        }
    }
}

if (!window.customElements.get('how-to-apply')) {
    window.customElements.define('how-to-apply', HowToApply);
}