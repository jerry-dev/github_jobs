import eventBus from '../../../utils/EventBus.js';

export default class FilterFormModal extends HTMLElement {
    static get observedAttributes() {
        return [ 'open' ];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.name = 'filter-form-modal';
        this.interests = [ 'dark-theme-activated', 'dark-theme-deactivated' ];
        this.observer = eventBus;
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[attrName] = this.getAttribute(attrName);
        }
    }

    connectedCallback() {
        this.render();
    }

    getName() {
        return this.name;
    }

    getInterests() {
        return this.interests;
    }

    render() {
        this.html();
        this.css();
        this.scripts();
        this.observer.register(this);
    }

    html() {
        this.shadowRoot.innerHTML += `
            <span id="mobileModalOverlay">
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
            </span>
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
                }

                #mobileModalOverlay {
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

                :host([open="true"]) {
                    display: block;
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

                :host(.darktheme) #filterModal {
                    background-color: var(--very-dark-blue);
                }

                :host(.darktheme) label {
                    color: var(--white);
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
                    display: none;
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
                    width: 24px;
                    height: 24px;
                    background-color: var(--opaque-very-dark-blue-1);
                }

                :host(.darktheme) .iconInputGroup:nth-child(2) label::before {
                    background-color: var(--opaque-white-2);
                }

                .iconInputGroup:nth-child(2) input:checked + label::before {
                    background-color: var(--blue-1);
                    background-image: url('../src/assets/icons/desktop/icon-check.svg');
                    background-repeat: no-repeat;
                    background-position: center;
                }

                :host(.darktheme) .iconInputGroup:nth-child(2) input:checked + label::before {
                    background-color: var(--blue-1);
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

    scripts() {
        this.clickEvents();
        this.observer.register(this);
        this.animateIn();
        this.submitOnEnterEvent();
    }

    closeSelf() {
        this.setAttribute("open", "false");
    }

    clickEvents() {
        this.shadowRoot.addEventListener('click', (event) => {
            const { tagName } = event.target;
            const { id } = event.target;

            switch (tagName) {
                case 'BUTTON':
                    this.publishFormDetails();
                    this.closeSelf();
                    break;
                case 'LABEL':
                    this.checkBoxManager();
                    break;
            }

            switch (id) {
                case 'mobileModalOverlay':
                    this.closeSelf();
                    break;
            }
        });
    }

    checkBoxManager() {
        const theCheckBox = this.shadowRoot.querySelectorAll('.iconInputGroup')[1].querySelector('span > input');
            
        if (!theCheckBox.checked) {
            theCheckBox.checked = true;
        } else {
            theCheckBox.checked = false;
        }
    }

    publishFormDetails() {
        const filterCriteria = {};
        filterCriteria.location = this.shadowRoot.querySelectorAll('.iconInputGroup')[0].querySelector('span > input').value;
        filterCriteria.type = this.shadowRoot.querySelectorAll('.iconInputGroup')[1].querySelector('span > input').checked;

        for (let prop in filterCriteria) {
            if (!filterCriteria[prop]) {
                delete filterCriteria[prop];
            }
        }

        this.observer.publish('filterFormModalSubmit', filterCriteria);
    }

    notificationReceiver(name, interest, theData) {
        switch (interest) {
            case 'dark-theme-activated':
                this.activateDarkTheme();
                break;
            case 'dark-theme-deactivated':
                this.deactivateDarkTheme();
                break;
        }
    }

    activateDarkTheme() {
        this.classList.add('darktheme');
    }

    deactivateDarkTheme() {
        this.classList.remove('darktheme');
    }

    animateIn() {
        this.shadowRoot.innerHTML += `
            <style>
                #mobileModalOverlay {
                    animation-duration: 0.2s;
                    animation-iteration-count: 1;
                    animation-name: loadIn;
                }

                @keyframes loadIn {
                    0% {
                        opacity: 0.5;
                    }
                    100% {
                        opacity: 1;
                    }
                }

                #filterModal {
                    animation-duration: 0.6s;
                    animation-iteration-count: 1;
                    animation-name: dropIn;
                }

                @keyframes dropIn {
                    0%, 50% {
                        transform: translateY(-500px);
                    }
                    100% {
                        transform: translateY(0);
                    }
                }
            </style>
        `;
    }

    submitOnEnterEvent() {
        const input1 = this.shadowRoot.querySelectorAll('.iconInputGroup')[0].querySelector('span > input');
        const input2 = this.shadowRoot.querySelectorAll('.iconInputGroup')[1].querySelector('span > input');

        input1.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                this.publishFormDetails();
                this.closeSelf();
            }
        });

        input2.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                this.publishFormDetails();
                this.closeSelf();
            }
        });
    }
}

if (!window.customElements.get('filter-form-modal')) {
    window.customElements.define('filter-form-modal', FilterFormModal)
}