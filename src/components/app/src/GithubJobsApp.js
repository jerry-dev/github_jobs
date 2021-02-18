import AppHeader from '../../appheader/src/AppHeader.js';

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
        // this.defaultCSS();
    }

    html() {
        this.shadowRoot.innerHTML += `
            <app-header></app-header>
        `;
    }

    defaultCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                :host {
                }
            </style>
        `;
    }
}

if (!window.customElements.get('github-jobs-app')) {
    window.customElements.define('github-jobs-app', GithubJobsApp);
}