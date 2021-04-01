export default class LoadMoreButton extends HTMLElement {
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
            <button type="button">Load More</button>
        `;
    }

    css() {
        this.defaultCSS();
    }

    defaultCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after { margin: 0; padding: 0; }
                
                :host {
                    display: inline-block;
                }

                button {
                    background-color: var(--blue-1);
                    border: none;
                    border-radius: 5px;
                    color: var(--white);
                    cursor: pointer;
                    font-size: var(--font-size-1);
                    font-weight: bold;
                    height: 48px;
                    width: 141px;
                }

                button:hover {
                    background-color: var(--light-violet);
                }
            </style>
        `;
    }
}

if (!window.customElements.get('load-more-button')) {
    window.customElements.define('load-more-button', LoadMoreButton)
}