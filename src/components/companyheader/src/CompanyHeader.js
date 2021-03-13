import logoManager from '../../../utils/logoManager.js';
import URLManager from '../../../utils/URLManager.js';

export default class CompanyHeader extends HTMLElement {
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
            <div id="listingHeader">
                ${logoManager(this.getAttribute('companyLogo'))}
                <div id="companyHeaderContainer">
                    <span class="innerContainer">
                        <span id="companyMetaDataContainer">
                            <h2>${this.getAttribute('companyName')}</h2>
                            <h4>${URLManager(this.getAttribute('companyURL'))}</h4>
                        </span>
                        <a id="companySiteLinkContainer" href="${URLManager(this.getAttribute('companyURL'))}">
                            Company Site
                        </a>
                    </span>
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
                    width: 100%;
                }

                a {
                    text-decoration: none;
                }

                #listingHeader {
                    border-radius: 6px;
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                }

                #listingHeader > img {
                    height: 140px;
                    width: 140px;
                }

                #companyHeaderContainer {
                    padding-bottom: 42px;
                    padding-top: 42px;
                    width: 100%;
                    background-color: var(--white);
                }

                #companyHeaderContainer > .innerContainer {
                    display: flex;
                    flex-direction: row;
                    height: 56px;
                    justify-content: space-between;
                    margin-left: auto;
                    margin-right: auto;
                    width: 85.932%;
                }

                #companyMetaDataContainer {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                #companyMetaDataContainer > h2 {
                    font-size: var(--h2-size);
                }

                #companyMetaDataContainer > h4 {
                    color: var(--dark-grey);
                    font-size: var(--font-size-1);
                }

                #companySiteLinkContainer {
                    align-items: center;
                    background-color: var(--opaque-blue-1);
                    border-radius: 5px;
                    color: var(--blue-1);
                    display: flex;
                    font-weight: bold;
                    height: 48px;
                    justify-content: center;
                    max-width: 147px;
                }

                #companySiteLinkContainer:hover {
                    background-color: var(--opaque-blue-2);
                }
            </style>
        `;
    }

    mobileLayoutCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 568px) {
                    *, *::before, *::after { padding: 0; margin: 0; }

                    #listingHeader {
                        position: relative;
                    }
                    
                    #listingHeader > img {
                        height: 50px;
                        left: 43%;
                        max-height: 140px;
                        max-width: 140px;
                        position: absolute;
                        top: -25px;
                        width: 50px;
                    }

                    #companyHeaderContainer {
                        padding-bottom: 32px;
                        padding-top: 49px;
                    }

                    #companyHeaderContainer > .innerContainer {
                        align-items: center;
                        flex-direction: column;
                        height: auto;
                        text-align: center;
                        width: 100%;
                    }
                }

                #companySiteLinkContainer {
                    width: 44.954%;
                }

                #companyMetaDataContainer {
                    justify-content: space-between;
                    margin-bottom: 24px;
                }

                #companyMetaDataContainer > h2 {
                    margin-bottom: 13px;
                }

            </style>
        `;
    }
}

if (!window.customElements.get('company-header')) {
    window.customElements.define('company-header', CompanyHeader)
}