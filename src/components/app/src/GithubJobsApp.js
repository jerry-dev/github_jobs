import AppHeader from '../../appheader/src/AppHeader.js';
import FilterForm from '../../filterform/src/FilterForm.js';

class GithubJobsApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
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
            <div id="appOuterContainer">
                <div id="appInnerContainer">
                    <app-header></app-header>
                    <filter-form></filter-form>
                </div>
            </div>
        `;
    }

    css() {
        this.shadowRoot.innerHTML += `
        <style>
            :host {
                display: block;
            }

            #appOuterContainer {
                margin-left: auto;
                margin-right: auto;
                max-width: 1440px;
            }

            #appInnerContainer {
                background-image: url('../src/assets/icons/desktop/bg-pattern-header.svg');
                background-repeat: no-repeat;    
                padding-left: clamp(33px, 12vw, 165px);
                padding-right: clamp(33px, 12vw, 165px);
                OUTLINE: 2PX SOLID GOLD;
            }
                
            @media screen and (max-width: 768px) {
                #appInnerContainer {
                    background-image: url('../src/assets/icons/tablet/bg-pattern-header.svg');
                    padding-left: clamp(7.8px, 6vw, 39px);
                    padding-right: clamp(8px, 6vw, 40px);
                }
            }
                
            @media screen and (max-width: 375px) {
                #appInnerContainer {
                    background-image: url('../src/assets/icons/mobile/bg-pattern-header.svg');
                    padding-left: clamp(4.8px, 7vw, 24px);
                    padding-right: clamp(4.8px, 7vw, 24px);
                }
            }
        </style>
        `;
    }
}

if (!window.customElements.get('github-jobs-app')) {
    window.customElements.define('github-jobs-app', GithubJobsApp);
}