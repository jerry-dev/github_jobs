import CompanyHeader from '../../companyheader/src/CompanyHeader.js';
import JobDetails from '../../jobdetails/src/JobDetails.js';
import HowToApply from '../../howtoapply/src/HowToApply.js';
import CompanyFooter from '../../companyfooter/src/CompanyFooter.js';
import eventBus from '../../../utils/EventBus.js';

export default class FullJobListing extends HTMLElement {
    static get observedAttributes() {
        return [ 'companyLogo, companyName, companyURL, createdAt, employmentType, positionTitle, jobLocation, howToApply, jobDescription' ];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
		if (oldValue !== newValue) {
			this[attrName] = this.getAttribute(attrName);
		}
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.name = 'full-job-listing';
        this.interests = ['dark-theme-activated', 'dark-theme-deactivated'];
        this.observer = eventBus;
    }

    connectedCallback() {
        this.render();
        this.observer.register(this);
    }

    render() {
        this.html();
        this.css();
        this.scripts();
    }

    html() {
        this.shadowRoot.innerHTML += `
            <div id="footerComponentContainer-1">
                <company-header ${this.darkThemeSync()}
                    companyLogo="${this.getAttribute('companyLogo')}"
                    companyName="${this.getAttribute('companyName')}"
                    companyURL="${this.getAttribute('companyURL')}"
                ></company-header>

                <job-details ${this.darkThemeSync()}
                    companyURL="${this.getAttribute('companyURL')}"
                    createdAt="${this.getAttribute('createdAt')}"
                    employmentType="${this.getAttribute('employmentType')}"
                    positionTitle="${this.getAttribute('positionTitle')}"
                    jobLocation="${this.getAttribute('jobLocation')}"
                    jobDescription="${this.getAttribute('jobDescription')}"
                ></job-details>

                <how-to-apply
                    howToApply='${this.getAttribute('howToApply')}'
                    companyURL="${this.getAttribute('companyURL')}"
                    companyName="${this.getAttribute('companyName')}"
                    jobLocation="${this.getAttribute('jobLocation')}"
                ></how-to-apply>
            </div>

            <div id="footerComponentContainer-2" ${this.darkThemeSync()}>
                <div>
                    <company-footer ${this.darkThemeSync()}
                        companyLogo="${this.getAttribute('companyLogo')}"
                        companyName="${this.getAttribute('companyName')}"
                        companyURL="${this.getAttribute('companyURL')}"
                    ></company-footer>
                </div>
            </div>
        `;
    }

    css() {
        this.defaultCSS();
        this.tabletLayoutCSS();
        this.inbetweenLayoutCSS();
        this.mobileLayoutCSS();
    }

    defaultCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                *, *::before, *::after { padding: 0; margin: 0; }

                :host {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }

                #footerComponentContainer-1 {
                    margin-left: auto;
                    margin-right: auto;
                    width: 65.765%;
                }

                job-details {
                    margin-top: 32px;
                    margin-bottom: 32px;
                }

                #footerComponentContainer-2 {
                    background-color: var(--white);
                    height: auto;
                    left: 50%;
                    margin-left: -50vw;
                    margin-top: 72px;
                    margin-right: -50vw;
                    max-width: 100vw;
                    padding-bottom: 22px;
                    padding-top: 23px;
                    position: relative;
                    right: 50%;
                    width: 100vw;
                }

                #footerComponentContainer-2.darktheme {
                    background-color: var(--very-dark-blue);
                }

                #footerComponentContainer-2 > div {
                    width: 50vw;
                    max-width: 730px;
                    margin-left: auto;
                    margin-right: auto;
                }
            </style>
        `;
    }

    tabletLayoutCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 879px) {
                    #footerComponentContainer-1 {
                        width: 100%;
                    }

                    #footerComponentContainer-2 > div {
                        width: 75vw;
                        max-width: 879px;
                    }
                }
            </style>
        `;
    }

    inbetweenLayoutCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 768px) {
                    #footerComponentContainer-2 > div {
                        width: 89vw;
                        max-width: 768px;
                    }
                }
            </style>
        `;
    }

    mobileLayoutCSS() {
        this.shadowRoot.innerHTML += `
            <style>
                @media screen and (max-width: 375px) {
                    company-header {
                        margin-bottom: 24px;
                    }

                    #footerComponentContainer-2 {
                        padding-bottom: 25px;
                        padding-top: 23px;
                    }

                    #footerComponentContainer-2 > div {
                        width: 85vw;
                        max-width: 375px;
                    }
                }
            </style>
        `;
    }

    scripts() {
        this.loadInAnimation();
        this.darkThemeSync();
    }

    loadInAnimation() {
        const container1 = this.shadowRoot.querySelector('#footerComponentContainer-1');

        container1.animate([
            {
                opacity: 0,
                transform: `translateX(-50px)`
            },
            {
                opacity: 1,
                transform: `translateX(0px)`
            }
        ], 400);
    }

    getEvent() {
        return this.event;
    }

    getName() {
        return this.name;
    }

    getInterests() {
        return this.interests;
    }

    notificationReceiver(name, interest, theData) {
        console.log(`${name} has received the notification.`);
        console.log(`The event "${interest}" took place.`);

        switch (interest) {
            case 'dark-theme-activated':
                this.activateDarkTheme();
                break;
            case 'dark-theme-deactivated':
                this.deactivateDarkTheme();
                break;
        }
    }

    activateDarkTheme() {
        this.classList.add('darktheme');
        this.shadowRoot.querySelector('#footerComponentContainer-2').classList.add('darktheme');
    }

    deactivateDarkTheme() {
        this.classList.remove('darktheme');
        this.shadowRoot.querySelector('#footerComponentContainer-2').classList.remove('darktheme');
    }

    darkThemeSync() {
        if (this.classList.contains('darktheme')) {
            return `class="darktheme"`;
        }
    }
}

if (!window.customElements.get('full-job-listing')) {
    window.customElements.define('full-job-listing', FullJobListing)
}