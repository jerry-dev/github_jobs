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
        this.shadowRoot.innerHTML += `
            <app-header></app-header>
        `;
    }
}

if (!window.customElements.get('github-jobs-app')) {
    window.customElements.define('github-jobs-app', GithubJobsApp);
}