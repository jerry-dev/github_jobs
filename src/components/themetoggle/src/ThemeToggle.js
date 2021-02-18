export default class ThemeToggle extends HTMLElement {
    static get observedAttributes() {
        return ['checked'];
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
        this.scripts();
    }

    html() {
        this.shadowRoot.innerHTML += `
            <div id="themeToggleInnerContainer">
                <input type="checkbox" id="themeSwitch">
                <label for="themeSwitch">
                    <img id="light" alt="light theme icon" src="../src/assets/icons/desktop/icon-sun.svg">
                    <span id="toggleOpening"></span>
                    <img id="dark" alt="dark theme icon" src="../src/assets/icons/desktop/icon-moon.svg">
                </label>
            </div>
        `;
    }

    defaultCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after { padding: 0; margin: 0; }

                :host {
                    max-width: 112px;
                }

                input[type="checkbox"] {
                    display: none;
                }

                label {
                    align-items: center;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                }

                #toggleOpening {
                    background-color: var(--white);
                    border-radius: 12px;
                    cursor: pointer;
                    position: relative;
                    height: 24px;
                    margin-left: 16px;
                    margin-right: 16px;
                    width: 48px;
                }

                #toggleOpening::before {
                    background-color: var(--blue-1);
                    border-radius: 12px;
                    content: "";
                    left: 5px;
                    top: 5px;
                    transition: transform 0.3s;
                    height: 14px;
                    width: 14px;
                    position: absolute;
                    z-index: 1;
                }

                #toggleOpening:hover::before {
                    background-color: var(--light-violet);
                }

                input[type="checkbox"]:checked + label #toggleOpening::before {
                    transform: translateX(24px);
                }
            </style>
        `;
    }

    scripts() {
        this.checkedEvent();
    }

    checkedEvent() {
        const toggle = this.shadowRoot.querySelector('#themeToggleInnerContainer > #themeSwitch');
        toggle.addEventListener('click', (event) => {
            this.setAttribute('checked', event.target.checked);
        });
    }
}

if (!window.customElements.get('theme-toggle')) {
    window.customElements.define('theme-toggle', ThemeToggle);
}