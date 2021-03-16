import URLManager from '../../../utils/URLManager.js';

export default class CompanyFooter extends HTMLElement {
    static get observedAttributes() {
        return [ 'companyLogo, companyName, companyURL' ];
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
            <div class="componentContainer">
                <span class="innerContainer">
                    <span id="companyMetaDataContainer">
                        <h2>${this.getAttribute('companyName')}</h2>
                        <h4>${URLManager(this.getAttribute('companyURL'))}</h4>
                    </span>
                    <a id="companySiteLink" href="${URLManager(this.getAttribute('companyURL'))}">
                        Apply Now
                    </a>
                </span>
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
                    display: block;
                    height: 100%;
                    width: 100%;
                }

                a {
                    text-decoration: none;
                }

                .componentContainer {
                    height: 51px;
                    width: 100%;
                }

                .innerContainer {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }

                #companyMetaDataContainer {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                #companyMetaDataContainer > h2 {
                    font-size: var(--h3-size);
                    line-height: var(--line-height-4);
                }

                #companyMetaDataContainer > h4 {
                    color: var(--dark-grey);
                    font-size: var(--font-size-1);
                }

                #companySiteLink {
                    align-items: center;
                    background-color: var(--blue-1);
                    border-radius: 5px;
                    color: var(--white);
                    display: flex;
                    font-weight: bold;
                    height: 48px;
                    justify-content: center;
                    width: 147px;
                }

                #companySiteLink:hover {
                    background-color: var(--light-violet);
                }
            </style>
        `;
    }

    mobileLayoutCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 375px) {
                    *, *::before, *::after { padding: 0; margin: 0; }

                    .componentContainer {
                        height: auto;
                    }

                    .componentContainer > .innerContainer {
                        align-items: center;
                        flex-direction: column;
                        height: auto;
                        text-align: center;
                        width: 100%;
                    }

                    #companySiteLink {
                        min-width: 100%;
                    }
    
                    #companyMetaDataContainer {
                        display: none;
                    }
                }
            </style>
        `;
    }
}

if (!window.customElements.get('company-footer')) {
    window.customElements.define('company-footer', CompanyFooter)
}