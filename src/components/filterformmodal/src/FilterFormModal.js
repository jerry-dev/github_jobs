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
                        <img src="../src/assets/icons/desktop/icon-location.svg">
                        <input type="text" placeholder="Filter by location…">
                    </span>
                    <span class="iconInputGroup">
                        <span>
                            <input type="checkbox" id="fullTimeOnlyOption">
                            <label for="fullTimeOnlyOption">Full Time <span id="only">Only</span></label>
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
                :host {
                    Xdisplay: none;
                    background-color: var(--overlay-color);
                    height: 100vh;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    top: 0;
                    width: 100vw;
                    z-index: 999;
                }

                #filterModal {
                    background-color: var(--white);
                    display: flex;
                    flex-direction: column;
                    padding-left: 24px;
                    padding-right: 24px;
                    position: relative;
                    margin-left: auto;
                    margin-right: auto;
                    top: 225px;
                    height: 217px;
                    width: 87.2%;
                    max-width: 327px;
                }

                .iconInputGroup {OUTLINE: 1PX SOLID RED;}

                .iconInputGroup input {
                    border: none;
                    font-size: clamp(8px, 1vw, var(--font-size-1));
                }

                .iconInputGroup span {
                    display: flex;
                    flex-direction: column;
                }

                .iconInputGroup:nth-child(1) {
                    background-color: lightpink;
                }

                .iconInputGroup:nth-child(2) input {
                    visibility: hidden;
                }

                .iconInputGroup:nth-child(2) label {
                    display: flex;
                    BACKGROUND-COLOR: LIGHTBLUE;
                }

                .iconInputGroup:nth-child(2) label::before {
                    border-radius: 3px;
                    content: "";
                    cursor: pointer;
                    display: block;
                    position: relative;
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
            </style>`;
    }
}

if (!window.customElements.get('filter-form-modal')) {
    window.customElements.define('filter-form-modal', FilterFormModal)
}