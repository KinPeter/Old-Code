import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
    navigateTo(): Promise<any> {
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    getHeaderElement(): ElementFinder {
        return element(by.css('app-header'));
    }
    getFrontPageElement(): ElementFinder {
        return element(by.tagName('app-front-page'));
    }
    getFooterElement(): ElementFinder {
        return element(by.tagName('app-footer'));
    }
    getLoginModalElement(): ElementFinder {
        return element(by.tagName('app-login-modal'));
    }
    getRegistrationPageElement(): ElementFinder {
        return element(by.tagName('app-registration-page'));
    }
    getLoginButton(): ElementFinder {
        return element(by.css('.my-head-info .btn-success:first-of-type'));
    }
    getRegisterButton(): ElementFinder {
        return element(by.css('.my-head-info .btn-success:last-of-type'));
    }
    getSearchNavbarButton(): ElementFinder {
        return element(by.css('header ul li:nth-child(3) a'));
    }
    getSearchPageElement(): ElementFinder {
        return element(by.tagName('app-search-page'));
    }
    getWannabeNavbarButton(): ElementFinder {
        return element(by.css('header ul li:nth-child(4) a'));
    }
    getWannabePageElement(): ElementFinder {
        return element(by.tagName('app-wannabe-sitter-page'));
    }
}
