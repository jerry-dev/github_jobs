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
        this.tabletLayoutCSS();
        this.mobileLayoutCSS();
    }

    html() {
        this.shadowRoot.innerHTML += `
            <div id="filterFormInnerContainer">
                <span class="iconInputGroup">
                    <span>
                        <img id="searchIcon1" src="../src/assets/icons/desktop/icon-search.svg">
                        <input type="text" placeholder="Filter by title, companies, expertise…">
                        <img id="filterIcon" class="mobileIcons" src="../src/assets/icons/mobile/icon-filter.svg">
                        <button type="button" class="mobileIcons">
                            <img src="../src/assets/icons/mobile/003-search.svg">
                        </button>
                    </span>
                </span>
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

    defaultCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after { padding: 0; margin: 0; }

                :host {
                    display: block;
                    width: 100%;
                }

                .mobileIcons {
                    display: none;
                }

                #filterFormInnerContainer {
                    align-items: center;
                    display: flex;
                    max-height: 100%;
                }

                .iconInputGroup {
                    align-items: center;
                    background-color: var(--white);
                    display: flex;
                    flex-direction: row;
                    justify-content: left;
                    padding-bottom: 28px;
                    padding-top: 28px;                    
                }

                .iconInputGroup:nth-child(1) {
                    max-height: 24px;
                    width: 100%;
                }

                .iconInputGroup input {
                    border: none;
                    font-size: clamp(8px, 2vw, var(--font-size-1));
                }

                .iconInputGroup input::placeholder {
                    color: var(--opaque-very-dark-blue-2);
                }

                .iconInputGroup:nth-child(1),
                .iconInputGroup:nth-child(2) {
                    border-right: 1px solid var(--opaque-dark-grey);
                }

                .iconInputGroup:nth-child(1) input:focus,
                .iconInputGroup:nth-child(2) input:focus {
                    outline: none;
                }

                .iconInputGroup:nth-child(1) img,
                .iconInputGroup:nth-child(2) img,
                .iconInputGroup:nth-child(3) input  {
                    margin-right: 16px;
                    margin-right: clamp(8px, 2vw, 16px);
                }

                .iconInputGroup:nth-child(1) {
                    border-radius: 6px 0 6px 0;
                    padding-left: clamp(6.4px, 2.88%, 32px);
                    padding-right: clamp(23.8px, 10.720%, 119px);
                }

                .iconInputGroup:nth-child(1) input {
                    width: clamp(54.2px, 19vw, 271px);
                }

                .iconInputGroup:nth-child(1) span {
                    align-items: center;
                    display: flex;
                    justify-content: space-between;
                    max-height: 24px;
                    width: 100%;
                }

                .iconInputGroup:nth-child(2) {
                    padding-left: clamp(4.6px, 2vw, 23px);
                    padding-right: clamp(21.6px, 8vw, 108px);
                }

                .iconInputGroup:nth-child(2) input {
                    width: clamp(27px, 15vw, 135px);
                }

                .iconInputGroup:nth-child(3) {
                    border-radius: 0 6px 0 6px;
                    padding-left: clamp(6.4px, 3vw, 32px);
                    padding-right: clamp(3.2px, 1vw, 16px);
                    position: relative;
                    width: 100%;
                }

                .iconInputGroup:nth-child(3) span {
                    align-items: center;
                    display: flex;
                    justify-content: space-between;
                    max-height: 24px;
                    width: 100%;
                }
                
                .iconInputGroup:nth-child(3) input {
                    visibility: hidden;
                }

                .iconInputGroup:nth-child(3) label::before {
                    border-radius: 3px;
                    content: "";
                    cursor: pointer;
                    position: absolute;
                    left: 9%;
                    top: 28px;
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
                    font-size: clamp(8px, 2vw, var(--font-size-1));
                    font-weight: bold;
                    margin-right: clamp(13px, 2vw, 26px);

                }

                .iconInputGroup:nth-child(3) button {
                    background-color: var(--blue-1);
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    color: var(--white);
                    font-size: clamp(var(--font-size-1)/2, 2vw, var(--font-size-1));
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

    tabletLayoutCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 768px) {
                    .iconInputGroup > input {
                        font-size: clamp(8px, 2vw, var(--font-size-1));
                    }

                    .iconInputGroup:nth-child(1) img,
                    .iconInputGroup:nth-child(2) img,
                    .iconInputGroup:nth-child(3) input  {
                        margin-right: 16px;
                        margin-right: clamp(8px, 2vw, 16px);
                    }

                    .iconInputGroup:nth-child(1) {
                        padding-left: clamp(4.8px, 3vw, 24px);
                        padding-right: clamp(10.2px, 7vw, 51px);
                    }

                    .iconInputGroup:nth-child(1) input {
                        width: clamp(21px, 14vw, 105px);
                    }

                    .iconInputGroup:nth-child(2) {
                        padding-left: clamp(4.8px, 3vw, 24px);
                        padding-right: clamp(4.2px, 3vw, 21px);
                    }
    
                    .iconInputGroup:nth-child(2) input {
                        width: clamp(27px, 18vw, 135px);
                    }

                    .iconInputGroup:nth-child(3) {
                        padding-left: clamp(4px, 3vw, 20px);
                        padding-right: clamp(3.2px, 2vw, 16px);
                    }

                    .iconInputGroup:nth-child(3) button {
                        padding-left: clamp(2.8px, 2vw, 14px);
                        padding-right: clamp(2.8px, 2vw, 14px);
                    }

                    #only {
                        display: none;
                    }
                }
            </style>
        `;
    }

    mobileLayoutCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 375px) {
                    .iconInputGroup {
                        border-radius: 6px 6px 6px 6px;
                        display: flex;
                        justify-content: space-between;
                        padding-bottom: 34px;
                        padding-top: 34px;
                        width: 100%;
                    }

                    .iconInputGroup:nth-child(1) {
                        padding-left: 24px;
                        padding-right: 16px;
                    }

                    .iconInputGroup:nth-child(1) span {
                        max-height: 16px;
                    }

                    #searchIcon1 {
                        display: none;
                    }

                    .mobileIcons {
                        display: block;
                    }

                    .iconInputGroup input {
                        font-size: clamp(8px, 5vw, var(--font-size-1));
                    }

                    #filterIcon {
                        margin-left: auto;
                        margin-right: 24.03px;
                    }

                    .iconInputGroup:nth-child(1) input {
                        border: none;
                        width: clamp(21px, 28vw, 105px);
                    }

                    .iconInputGroup:nth-child(1) button {
                        background-color: var(--blue-1);
                        border: none;
                        border-radius: 5px;
                        padding-bottom: 14px;
                        padding-top: 14px;
                        padding-left: 14px;
                        padding-right: 14px;
                        max-height: 48px;
                        max-width: 48px;
                    }

                    .iconInputGroup:nth-child(2),
                    .iconInputGroup:nth-child(3) {
                        display: none;
                    }
                }
            </style>
        `;
    }
}

if (!window.customElements.get('filter-form')) {
    window.customElements.define('filter-form', FilterForm)
}