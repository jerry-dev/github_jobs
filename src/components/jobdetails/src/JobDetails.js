import createdAt from '../../../utils/createdAt.js';
import URLManager from '../../../utils/URLManager.js';

export default class JobDetails extends HTMLElement {
    static get observedAttributes() {
        return [ 'companyURL, createdAt, employmentType, positionTitle, jobLocation, jobDescription' ];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
		if (oldValue !== newValue) {
			this[attrName] = this.getAttribute(attrName);
		}
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
        this.css();
    }

    html() {
        this.shadowRoot.innerHTML += `
            <div id="jobDetailsInnerContainer">
                <section id="one">
                    <span id="beginning">
                        <span class="metaDataContainer">
                            <small class="metaData">${createdAt(this.getAttribute('createdAt'))} .</small>
                            <small class="metaData">${this.getAttribute('employmentType')}</small>
                        </span>
                            <h1 class="title">${this.getAttribute('positionTitle')}</h1>
                            <h4 class="location">${this.getAttribute('jobLocation')}</h4>
                    </span>
                    
                    <span id="end">
                        <a id="companySiteLink" target="_blank" href="${this.getAttribute('companyURL')}">
                            Apply Now
                        </a>
                    </span>
                </section>
                
                <article id="descriptionContainer">
                    ${this.getAttribute('jobDescription')}
                </article>
            </div>
        `;
    }

    css() {
        this.defaultCSS();
        this.tabletLayoutCSS();
        this.mobileLayoutCSS();
    }

    defaultCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after { margin: 0; padding: 0; }

                :host {
                    background-color: var(--white);
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }

                a {
                    text-decoration: none;
                }

                #jobDetailsInnerContainer {
                    margin-left: auto;
                    margin-right: auto;
                    margin-top: 48px;
                    width: 87.534%;
                }

                section#one {
                    align-items: center;
                    display: flex;
                    flex-direction: row;
                    height: 87px;
                    justify-content: space-between;
                    margin-bottom: 40px;
                    width: 100%;
                }

                #beginning {
                    height: 100%;
                }

                #end {
                    min-width: 141px;
                }

                .metaData {
                    color: var(--dark-grey);
                    font-size: var(--font-size-1);
                }

                #companySiteLink {
                    align-items: center;
                    background-color: var(--blue-1);
                    border-radius: 5px;
                    color: var(--white);
                    display: flex;
                    font-weight: bold;
                    height: 48px;
                    justify-content: center;
                    width: 100%;
                }

                #companySiteLink:hover {
                    background-color: var(--opaque-blue-2);
                }

                .title {
                    font-size: clamp(8px, 2.2vw, var(--h1-size));
                    line-height: var(--line-height-3);
                    margin-bottom: 14px;
                    margin-top: 8px;
                }

                .location {
                    color: var(--blue-1);
                    font-size: var(--h4-size);
                    line-height: 14px;
                    font-weight: bold;
                }

                #descriptionContainer > * {
                    color: var(--dark-grey);
                    line-height: var(--line-height-2);
                    margin-bottom: 24px;
                    width: 100%;
                }

                #descriptionContainer > ul {
                    list-style-position: inside;
                }

                #descriptionContainer > ul li {
                    margin-bottom: 8px;
                }

                #descriptionContainer > p {
                    margin-bottom: 12px;
                }
            </style>
        `;
    }

    tabletLayoutCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 768px) {
                    #jobDetailsInnerContainer {
                        width: 86.066%;
                    }

                    .title {
                        font-size: clamp(8px, 4vw, var(--h1-size));
                    }
                }
            </style>
        `;
    }

    mobileLayoutCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 375px) {
                    #jobDetailsInnerContainer {
                        margin-top: 40px;
                        width: 86.066%;
                    }

                    section#one {
                        flex-direction: column;
                        height: auto;
                    }

                    .title {
                        font-size: clamp(10px, 6vw, var(--font-size-2));
                        line-height: var(--line-height-4);
                        margin-bottom: 12px;
                    }

                    #beginning {
                        margin-bottom: 32px;
                    }

                    #end {
                        width: 100%;
                    }

                    #companySiteLink {
                        width: 100%;
                    }

                    #descriptionContainer {
                        margin-top: 32px;
                    }
                }
            </style>
        `;
    }
}

if (!window.customElements.get('job-details')) {
    window.customElements.define('job-details', JobDetails)
}