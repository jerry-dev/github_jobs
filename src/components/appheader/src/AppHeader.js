import ThemeToggle from '../../themetoggle/src/ThemeToggle.js';

export default class AppHeader extends HTMLElement {
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
            <div id="headerInnerContainer">
                <img class="logo" src="../src/assets/icons/desktop/logo.svg">
                <theme-toggle nightThemeOn=false></theme-toggle>
            </div>
        `;
    }

    defaultCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after { padding: 0; margin: 0; }

                :host {
                    display: block;
                    padding-bottom: 44px;
                    padding-top: 45px;
                    OUTLINE: 1PX SOLID red;
                }

                #headerInnerContainer {
                    align-items: center;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    max-height: 32px;
                }
            </style>
        `;
    }
}

if (!window.customElements.get('app-header')) {
    window.customElements.define('app-header', AppHeader);
}