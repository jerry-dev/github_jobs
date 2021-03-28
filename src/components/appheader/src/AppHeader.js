import ThemeToggle from '../../themetoggle/src/ThemeToggle.js';
import eventBus from '../../../utils/EventBus.js';

export default class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.name = `app-header`;
        this.interests = [];
        this.observer = eventBus;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.html();
        this.defaultCSS();
        this.tabletLayoutCSS();
        this.mobiletLayoutCSS();
        this.scripts();
        this.observer.register(this);
    }

    html() {
        this.shadowRoot.innerHTML += `
            <div id="headerInnerContainer">
                <a href="/" id="rootNavigator">
                    <img class="logo" src="../src/assets/icons/desktop/logo.svg">
                </a>
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
                }

                a {
                    width: 115px;
                    height: 32px;
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

    tabletLayoutCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 768px) {
                    :host {
                        padding-bottom: 46px;
                        padding-top: 42px;
                    }
                }
            </style>
        `;
    }

    mobiletLayoutCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 375px) {
                    :host {
                        padding-bottom: 32px;
                        padding-top: 32px;
                    }
                }
            </style>
        `;
    }

    scripts() {
        this.navigateToRoot();
    }

    getName() {
        return this.name;
    }

    getInterests() {
        return this.interests;
    }

    navigateToRoot() {
        this.shadowRoot.querySelector('#rootNavigator').addEventListener('click', (event) => {
            event.preventDefault();
            this.observer.publish('navigate-to-root');
        });
    }
}

if (!window.customElements.get('app-header')) {
    window.customElements.define('app-header', AppHeader);
}