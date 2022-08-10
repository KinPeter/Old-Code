import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('App Base navigation', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should render header, front-page and footer', () => {
        browser.waitForAngularEnabled(false);
        page.navigateTo();
        expect(page.getHeaderElement().isDisplayed()).toBe(true);
        expect(page.getFrontPageElement().isDisplayed()).toBe(true);
        expect(page.getFooterElement().isDisplayed()).toBe(true);
        expect(page.getRegistrationPageElement().isPresent()).toBe(false);
    });

    it('should not open login modal on start', () => {
        browser.waitForAngularEnabled(false);
        page.navigateTo();
        expect(page.getLoginModalElement().isPresent()).toBe(false);
    });

    it('should open login modal on login button click', () => {
        browser.waitForAngularEnabled(false);
        page.navigateTo();
        page.getLoginButton().click();
        expect(page.getLoginModalElement().isPresent()).toBe(true);
        expect(page.getLoginModalElement().isDisplayed()).toBe(true);
    });

    it('should display registration page and correct url', () => {
        browser.waitForAngularEnabled(false);
        page.navigateTo();
        page.getRegisterButton().click();
        expect(page.getRegistrationPageElement().isPresent()).toBe(true);
        expect(page.getRegistrationPageElement().isDisplayed()).toBe(true);
        expect(page.getLoginModalElement().isPresent()).toBe(false);
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/registration-page');
    });

    it('should display search page and correct url', () => {
        browser.waitForAngularEnabled(false);
        browser.driver.manage().window().maximize();
        page.navigateTo();
        page.getSearchNavbarButton().click();
        expect(page.getSearchPageElement().isPresent()).toBe(true);
        expect(page.getSearchPageElement().isDisplayed()).toBe(true);
        expect(page.getLoginModalElement().isPresent()).toBe(false);
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/sitter/search');
    });

    it('should display wannabe sitter page and correct url', () => {
        browser.waitForAngularEnabled(false);
        browser.driver.manage().window().maximize();
        page.navigateTo();
        page.getWannabeNavbarButton().click();
        expect(page.getWannabePageElement().isPresent()).toBe(true);
        expect(page.getWannabePageElement().isDisplayed()).toBe(true);
        expect(page.getLoginModalElement().isPresent()).toBe(false);
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/wannabe-sitter-page');
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        // expect(logs).not.toContain(jasmine.objectContaining({
        //     level: logging.Level.SEVERE,
        // } as logging.Entry));
    });
});
