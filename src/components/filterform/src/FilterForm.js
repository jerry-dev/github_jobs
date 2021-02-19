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
                    display: block;
                    BACKGROUND-COLOR: LIGHTPINK;
                }

                #filterFormInnerContainer {
                    align-items: center;
                    display: flex;
                    height: 80px;
                }

                .iconInputGroup {
                    align-items: center;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                }
            </style>
        `;
    }
}

if (!window.customElements.get('filter-form')) {
    window.customElements.define('filter-form', FilterForm)
}