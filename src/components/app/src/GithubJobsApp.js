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
            <app-header></app-header>
            <filter-form></filter-form>
        `;
    }
    
    css() {
        this.shadowRoot.innerHTML += `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }
            </style>
        `;
    }
}

if (!window.customElements.get('github-jobs-app')) {
    window.customElements.define('github-jobs-app', GithubJobsApp);
}