export default class FilterForm extends HTMLElement {
    static get observedAttributes() {
        return ['filterKeyword, filterLocation, fullTimeOnly'];
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
        this.defaultCSS();
    }

    html() {
        this.shadowRoot.innerHTML += `
            <div id="filterFormInnerContainer">
                <span class="iconInputGroup">
                    <img src="../src/assets/icons/desktop/icon-search.svg">
                    <input type="text" placeholder="Filter by title, companies, expertise…">
                </span>
                <span class="iconInputGroup">
                    <img src="../src/assets/icons/desktop/icon-location.svg">
                    <input type="text" placeholder="Filter by location…">
                </span>
                <span class="iconInputGroup">
                    <input type="checkbox" id="fullTimeOnlyOption">
                    <label for="fullTimeOnlyOption">Full Time Only</label>
                    <button>Search</button>
                </span>
            </div>
        `;
    }

    defaultCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after { padding: 0; margin: 0; }

                :host {
                    background-color: var(--white);
                    border-radius: 6px;
                    display: block;
                    height: 80px;
                }

                #filterFormInnerContainer {
                    align-items: center;
                    display: flex;
                    max-height: 100%;
                }

                .iconInputGroup {
                    align-items: center;
                    display: flex;
                    flex-direction: row;
                    justify-content: left;
                    padding-bottom: 28px;
                    padding-top: 28px;
                    OUTLINE: 2PX SOLID RED;
                }

                .iconInputGroup > input {
                    border: none;
                    font-size: var(--font-size-1);
                }

                .iconInputGroup > input::placeholder {
                    color: var(--opaque-very-dark-blue-2);
                }

                .iconInputGroup:nth-child(1),
                .iconInputGroup:nth-child(2) {
                    border: 1px solid var(--opaque-dark-grey);
                }

                .iconInputGroup:nth-child(1) img,
                .iconInputGroup:nth-child(2) img,
                .iconInputGroup:nth-child(3) input  {
                    margin-right: 16px;
                }

                .iconInputGroup:nth-child(1) {
                    padding-left: clamp(6.4px, 2.88%, 32px);
                    padding-right: clamp(23.8px, 10.720%, 119px);
                }

                .iconInputGroup:nth-child(1) input {
                    width: clamp(54.2px, 19vw, 271px);
                }

                .iconInputGroup:nth-child(2) {
                    padding-left: clamp(4.6px, 2vw, 23px);
                    padding-right: clamp(21.6px, 8vw, 108px);
                }

                .iconInputGroup:nth-child(2) input {
                    width: clamp(27px, 15vw, 135px);
                }

                .iconInputGroup:nth-child(3) {
                    padding-left: clamp(6.4px, 3vw, 32px);
                    padding-right: clamp(3.2px, 1vw, 16px);
                    position: relative;
                    OUTLINE: 2PX SOLID BLACK;
                }
                
                .iconInputGroup:nth-child(3) input {
                    visibility: hidden;
                }

                .iconInputGroup:nth-child(3) label::before {
                    border-radius: 3px;
                    content: "";
                    cursor: pointer;
                    position: absolute;
                    left: 26px;
                    top: 40px;
                    width: 24px;
                    height: 24px;
                    background-color: var(--opaque-very-dark-blue-1);
                }

                .iconInputGroup:nth-child(3) input:checked + label::before {
                    background-color: var(--blue-1);
                    background-image: url('../src/assets/icons/desktop/icon-check.svg');
                    background-repeat: no-repeat;
                    background-position: center;
                }




                .iconInputGroup:nth-child(3) label {
                    font-weight: bold;
                    margin-right: 26px;
                    Xwhite-space: nowrap;
                }

                .iconInputGroup:nth-child(3) button {
                    background-color: var(--blue-1);
                    border: none;
                    border-radius: 5px;
                    color: var(--white);
                    font-size: var(--font-size-1);
                    line-height: var(--line-height-1);
                    font-weight: bold;
                    padding-bottom: 16px;
                    padding-top: 16px;
                    padding-left: clamp(7px, 3vw, 35.5px);
                    padding-right: clamp(7px, 3vw, 35.5px);
                }
            </style>
        `;
    }
}

if (!window.customElements.get('filter-form')) {
    window.customElements.define('filter-form', FilterForm)
}