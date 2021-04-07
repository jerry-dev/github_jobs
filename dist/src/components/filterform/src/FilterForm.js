import FilterFormModal from '../../filterformmodal/src/FilterFormModal.js';
import eventBus from '../../../utils/EventBus.js';

export default class FilterForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.name = 'filter-form';
        this.interests = [
            'filterFormModalSubmit',
            'dark-theme-activated',
            'dark-theme-deactivated'
        ];
        this.observer = eventBus;
    }

    getName() {
        return this.name;
    }

    getInterests() {
        return this.interests;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.html();
        this.css();
        this.scripts();
    }

    css() {
        this.defaultCSS();
        this.betweenDesktopAndTabletCSS();
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
                    <span>
                        <img src="../src/assets/icons/desktop/icon-location.svg">
                        <input type="text" placeholder="Filter by location…">
                    </span>
                </span>
                <span class="iconInputGroup">
                    <span>
                        <input type="checkbox" id="fullTimeOnlyOption">
                        <label for="fullTimeOnlyOption">Full Time <span id="only">&nbsp;Only</span></label>
                        <button type="button">Search</button>
                    </span>
                </span>
            </div>
            <filter-form-modal open="false" ${this.darkThemeClassManager()}></filter-form-modal>
        `;
    }

    defaultCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after { padding: 0; margin: 0; }

                :host {
                    background-color: var(--white);
                    display: block;
                    width: 100%;
                }

                :host(.darktheme),
                :host(.darktheme) input[type="text"],
                :host(.darktheme) .iconInputGroup input::placeholder{
                    color: var(--opaque-white);
                    background-color: var(--very-dark-blue);
                }

                :host(.darktheme) label {
                    color: var(--white);
                }

                :host(.darktheme) #filterIcon {
                    content:url("../src/assets/icons/mobile/icon-filter-white.svg");
                }

                .mobileIcons {
                    display: none;
                }

                #filterFormInnerContainer {
                    align-items: center;
                    display: flex;
                    max-width: 100%;
                }

                .iconInputGroup {
                    align-items: center;
                    
                    display: flex;
                    flex-direction: row;
                    justify-content: left;
                    padding-bottom: 28px;
                    padding-top: 28px;                    
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
                    border-radius: 6px 0px 0px 6px;
                    max-height: 24px;
                    width: 41.711%;
                }

                .iconInputGroup:nth-child(1) input {
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: clamp(54.2px, 19vw, 271px);
                }

                .iconInputGroup:nth-child(1) span {
                    align-items: center;
                    display: flex;
                    justify-content: left;
                    width: 67.386%;
                    margin-left: 6.911%;
                    margin-right: auto;
                    max-height: 24px;
                }

                .iconInputGroup:nth-child(2) {
                    padding-bottom: 28px;
                    padding-top: 28px;
                    width: 27.027%;
                }

                .iconInputGroup:nth-child(2) span {
                    display: flex;
                    margin-left: 7.666%;
                    max-height: 24px;
                    width: 56.333%;
                }

                .iconInputGroup:nth-child(2) input {
                    padding-top: 6px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: clamp(27px, 15vw, 135px);
                }

                .iconInputGroup:nth-child(3) {
                    border-radius: 0px 6px 6px 0px;
                    display: flex;
                    justify-content: flex-start;
                    width: 31.081%;
                    position: relative;
                }

                .iconInputGroup:nth-child(3) span {
                    align-items: center;
                    display: flex;
                    justify-content: space-between;
                    margin-right: auto;
                    margin-left: auto;
                    max-height: 24px;
                    width: 86.086%;
                }
                
                .iconInputGroup:nth-child(3) input {
                    display: none;
                }

                .iconInputGroup:nth-child(3) label::before {
                    border-radius: 3px;
                    content: "";
                    cursor: pointer;
                    display: block;
                    position: relative;
                    margin-right: clamp(8px, 2vw, 16px);
                    left: 0px;
                    top: -4px;
                    min-width: 24px;
                    height: 24px;
                    background-color: var(--opaque-very-dark-blue-1);
                }

                :host(.darktheme) .iconInputGroup:nth-child(3) label::before {
                    background-color: var(--opaque-white-2);
                }

                .iconInputGroup:nth-child(3) input:checked + label::before {
                    background-color: var(--blue-1);
                    background-image: url('../src/assets/icons/desktop/icon-check.svg');
                    background-repeat: no-repeat;
                    background-position: center;
                }

                :host(.darktheme) .iconInputGroup:nth-child(3) input:checked + label::before {
                    background-color: var(--blue-1);
                }

                .iconInputGroup:nth-child(3) label {
                    font-size: clamp(8px, 2vw, var(--font-size-1));
                    font-weight: bold;
                    display: flex;
                    max-height: 16px;
                    white-space: nowrap;
                    margin-right: clamp(8px, 2vw, 16px);
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
                    width: 41.414%;
                }

                .iconInputGroup:nth-child(3) button:hover {
                    background-color: var(--light-violet);
                }
            </style>
        `;
    }

    betweenDesktopAndTabletCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 1076px) {
                    #only {
                        display: none;
                    }
                }
            </style>`
    }

    tabletLayoutCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 768px) {
                    .iconInputGroup > input {
                        font-size: clamp(8px, 2vw, var(--font-size-1));
                    }

                    .iconInputGroup:nth-child(1) {
                        width: 32.220%;
                    }

                    .iconInputGroup:nth-child(1) span {
                        width: 66.216%;
                    }

                    .iconInputGroup:nth-child(1) input {
                        width: 69%;
                    }

                    .iconInputGroup:nth-child(2) {
                        width: 30.914%;
                    }

                    .iconInputGroup:nth-child(2) span {
                        width: 79.342%;
                    }

                    .iconInputGroup:nth-child(2) input {
                        width: 63.380%;
                    }

                    .iconInputGroup:nth-child(3) {
                        width: 36.574%;
                    }

                    .iconInputGroup:nth-child(3) span {
                        width: 85.714%;
                    }

                    .iconInputGroup:nth-child(3) button {
                        width: 37.037%;
                    }

                    .iconInputGroup:nth-child(1) img,
                    .iconInputGroup:nth-child(2) img,
                    .iconInputGroup:nth-child(3) input  {
                        margin-right: 16px;
                        margin-right: clamp(8px, 2vw, 16px);
                    }
                }
            </style>
        `;
    }

    mobileLayoutCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 414px) {
                    #searchIcon1 {
                        display: none;
                    }

                    .mobileIcons {
                        display: block;
                    }

                    .iconInputGroup:nth-child(1) {
                        border-radius: 6px 6px 6px 6px;
                        width: 100%;
                    }

                    .iconInputGroup:nth-child(1) span {
                        width: 87.155%;
                    }

                    .iconInputGroup:nth-child(1) input {
                        width: 36.585%;
                        font-size: clamp(8px, 5vw, var(--font-size-1));
                        margin-right: auto;
                        
                    }

                    .iconInputGroup:nth-child(1) #filterIcon {
                        margin-left: auto;
                        margin-right: 24.03px;
                    }

                    .iconInputGroup:nth-child(1) button {
                        background-color: var(--blue-1);
                        border-radius: 5px;
                        margin-left: auto;
                        border: none;
                        height: 48px;
                        width: 16.842%;
                        margin-left: 0px;
                    }

                    .iconInputGroup:nth-child(1) button img {
                        margin-left: auto;
                        margin-right: auto;
                    }

                    .iconInputGroup:nth-child(2),
                    .iconInputGroup:nth-child(3) {
                        display: none;
                    }
                }
            </style>
        `;
    }

    scripts() {
        this.filterModalOpenEvent();
        this.clickEvents();
        this.submitOnEnterEvent();
        this.observer.register(this);
    }

    openFilterModal() {
        const filterFormModal = this.shadowRoot.querySelector('filter-form-modal');
        const open = filterFormModal.getAttribute('open');

        switch (open) {
            case 'false':
            case false: 
                filterFormModal.setAttribute('open', "true");
                this.closeFilterModalEvent();
                break;
        }
    }

    filterModalOpenEvent() {
        this.shadowRoot.addEventListener('click', (event) => {
            const { id } = event.target;

            switch (id) {
                case 'filterIcon': this.openFilterModal();
                    break;
            }
        });
    }

    closeFilterModalEvent() {
        const filterFormModal = this.shadowRoot.querySelector('filter-form-modal');

        // window.addEventListener('keydown', (event) => {
        //     if (event.key === 'Escape') {
        //         filterFormModal.setAttribute('open', "false");
        //     }
        // });

        // window.addEventListener('scroll', () => {
        //     filterFormModal.setAttribute('open', "false");
        // });

        // window.addEventListener('resize', () => {
        //     if (window.outerWidth > 414) {
        //         filterFormModal.setAttribute('open', "false");
        //     }
        // });
    }

    clickEvents() {
        this.shadowRoot.addEventListener('click', (event) => {
            event.preventDefault();
            const { tagName } = event.target;

            switch (tagName) {
                case 'BUTTON':
                case 'IMG':
                    this.publishFormDetails();
                    break;
                case 'LABEL':
                    this.checkBoxManager();
                    break;
                case 'INPUT':
                    if (event.target.id && event.target.id === 'fullTimeOnlyOption') {
                        this.checkBoxManager()
                    }
                    break;
            }
        });
    }

    submitOnEnterEvent() {
        const input1 = this.shadowRoot.querySelectorAll('.iconInputGroup')[0].querySelector('span > input');
        const input2 = this.shadowRoot.querySelectorAll('.iconInputGroup')[1].querySelector('span > input');

        input1.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                this.publishFormDetails();
            }
        });

        input2.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                this.publishFormDetails();
            }
        });
    }

    checkBoxManager() {
        const theCheckBox = this.shadowRoot.querySelectorAll('.iconInputGroup')[2].querySelector('span > input');
            
        if (!theCheckBox.checked) {
            theCheckBox.checked = true;
        } else {
            theCheckBox.checked = false;
        }
    }

    publishFormDetails() {
        const filterCriteria = {};
        filterCriteria.description = this.shadowRoot.querySelectorAll('.iconInputGroup')[0].querySelector('span > input').value;
        filterCriteria.location = this.shadowRoot.querySelectorAll('.iconInputGroup')[1].querySelector('span > input').value;
        filterCriteria.type = this.shadowRoot.querySelectorAll('.iconInputGroup')[2].querySelector('span > input').checked;

        for (let prop in filterCriteria) {
            if (!filterCriteria[prop]) {
                delete filterCriteria[prop];
            }
        }

        this.observer.publish('filter-search', filterCriteria);
    }

    publishModalFormDetails(filterCriteria) {
        filterCriteria.description = this.shadowRoot.querySelectorAll('.iconInputGroup')[0].querySelector('span > input').value;

        for (let prop in filterCriteria) {
            if (!filterCriteria[prop]) {
                delete filterCriteria[prop];
            }
        }

        this.observer.publish('filter-search', filterCriteria);
    }

    notificationReceiver(name, interest, theData) {
        switch (interest) {
            case 'filterFormModalSubmit':
                this.publishModalFormDetails(theData);
                break;
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

    darkThemeClassManager() {
        if (this.classList.contains('darktheme')) {
            return `class="darktheme"`;
        }
    }
}

if (!window.customElements.get('filter-form')) {
    window.customElements.define('filter-form', FilterForm)
}