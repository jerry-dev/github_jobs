export default class FilterFormModal extends HTMLElement {
    static get observedAttributes() {
        return ['open'];
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
                <div id="filterModal">
                    <span class="iconInputGroup">
                        <span>
                            <img src="../src/assets/icons/desktop/icon-location.svg">
                            <input type="text" placeholder="Filter by location…">
                        </span>
                    </span>
                    <span class="iconInputGroup">
                        <span>
                            <input type="checkbox" id="fullTimeOnlyOption">
                            <label for="fullTimeOnlyOption">Full Time Only</label>
                            <button type="button">Search</button>
                        </span>
                    </span>
                </div>
        `;
    }

    css() {
        this.defaultLayoutCSS();
    }

    defaultLayoutCSS() {
        this.shadowRoot.innerHTML += `
            <style>

                *, *::before, *::after { padding: 0; margin: 0; }

                :host {
                    display: none;
                    background-color: var(--overlay-color);
                    height: 100vh;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    top: 0;
                    width: 100vw;
                    z-index: 999;
                    animation-name: overlayLoadIn;
                    animation-iteration-count: 1;
                    animation-duration: 0.4s;
                }

                @keyframes overlayLoadIn {
                    :host {
                        0% {
                            transform: scale(0);
                        }

                        100% {
                            transform: scale(1);
                        }
                    }
                }

                #filterModal {
                    background-color: var(--white);
                    border-radius: 6px;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    margin-left: auto;
                    margin-right: auto;
                    max-width: 327px;
                    top: 225px;
                    animation-name: modalLoadIn;
                    animation-iteration-count: 1;
                    animation-duration: 0.8s;
                }

                @keyframes overlayLoadIn {
                    :host {
                        0%, 50% {
                            transform: translateX(-200px);
                        }

                        100% {
                            transform: translateX(0px);
                        }
                    }
                }

                .iconInputGroup {
                    padding-left: 24px;
                    padding-right: 24px;
                }

                .iconInputGroup:nth-child(1) {
                    border-bottom: 1px solid var(--opaque-dark-grey);
                    padding-bottom: 20px;
                }

                .iconInputGroup:nth-child(1) span {
                    display: flex;
                    flex-direction: row;
                    height: 24px;
                }

                .iconInputGroup:nth-child(1) span img {
                    height: 24px;
                    width: 17px;
                }

                .iconInputGroup:nth-child(1) input {
                    border: none;
                    font-size: var(--font-size-1);
                    padding-top: 12px;
                }

                .iconInputGroup span {
                    display: flex;
                    flex-direction: column;
                }

                .iconInputGroup:nth-child(1) img {
                    margin-right: 17px;
                }

                .iconInputGroup:nth-child(1) input {
                    background: none;
                }

                .iconInputGroup:nth-child(1) input:focus {
                    outline: none;
                }

                .iconInputGroup:nth-child(1) {
                    padding-bottom: 20px;
                    padding-top: 24px;
                }

                .iconInputGroup:nth-child(2) {
                    padding-bottom: 24px;
                    padding-top: 24px;
                }

                .iconInputGroup:nth-child(2) input {
                    visibility: hidden;
                }

                .iconInputGroup:nth-child(2) label {
                    align-items: center;
                    display: flex;
                    font-weight: bold;
                    margin-bottom: 24px;
                }

                .iconInputGroup:nth-child(2) label::before {
                    border-radius: 3px;
                    content: "";
                    cursor: pointer;
                    display: block;
                    position: relative;
                    margin-right: 16px;
                    left: 0px;
                    Xtop: 10px;
                    width: 24px;
                    height: 24px;
                    background-color: var(--opaque-very-dark-blue-1);
                }

                .iconInputGroup:nth-child(2) input:checked + label::before {
                    background-color: var(--blue-1);
                    background-image: url('../src/assets/icons/desktop/icon-check.svg');
                    background-repeat: no-repeat;
                    background-position: center;
                }

                .iconInputGroup:nth-child(2) button {
                    background-color: var(--blue-1);
                    border: none;
                    border-radius: 5px;
                    color: var(--white);
                    cursor: pointer;
                    font-size: var(--font-size-1);
                    font-weight: bold;
                    padding-bottom: 16px;
                    padding-top: 16px;
                }
            </style>`;
    }
}

if (!window.customElements.get('filter-form-modal')) {
    window.customElements.define('filter-form-modal', FilterFormModal)
}