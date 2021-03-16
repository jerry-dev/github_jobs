export default class HowToApply extends HTMLElement {
    static get observedAttributes() {
        return ['howToApply'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[attrName] = this.getAttribute(attrName);
        }
    } 

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        console.log(this.getAttribute('howToApply'));
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
            <div class="componentInnerContainer">
                <h3>How To Apply</h3>

                <p>
                   ${this.getAttribute('howToApply')}
                <p>
            </div>
        `;
    }


    css() {
        this.defaultCSS();
        this.mobileLayoutCSS();
    }

    defaultCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after { padding: 0; margin: 0; }

                :host {
                    background-color: var(--blue-1);
                    background-image: url('../src/assets/icons/desktop/bg-pattern-detail-footer.svg');
                    background-repeat: no-repeat;
                    background-position: center;
                    border-radius: 6px;
                    color: var(--white);
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }

                .componentInnerContainer {
                    height: auto;
                    margin-bottom: 41px;
                    margin-left: auto;
                    margin-right: auto;
                    margin-top: 40px;
                    width: 87.534%;
                }

                .componentInnerContainer > h3 {
                    font-size: var(--h3-size);
                    line-height: 20px;
                }

                .componentInnerContainer > p {
                    margin-bottom: 28px;
                }

                .componentInnerContainer > p > * {
                    color: var(--white);
                    font-size: 16px;
                    text-decoration: none;
                    line-height: 26px;
                }
            </style>
        `;
    }

    mobileLayoutCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 375px) {
                    :host {
                        background-position: bottom;
                    }
    
                    .componentInnerContainer {
                        margin-bottom: 32px;
                        margin-top: 32px;
                    }
                }
            </style>
        `;
    }
}

if (!window.customElements.get('how-to-apply')) {
    window.customElements.define('how-to-apply', HowToApply);
}