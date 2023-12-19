abstract class BasePageObject {
  abstract get baseSelector(): string;

  /**
   * All page objects must implement a base selector which this.self returns
   */
  public get self() {
    return cy.get(this.baseSelector);
  }

  /**
   * Search entire DOM for anything that indicates loading/progress
   */
  private loading(timeout = 10_000) {
    return cy.get('[loading="true"],[part*=loading],[role="progressbar"]', {
      timeout,
    });
  }

  /**
   * Opens the application under test, in this case the Iconic website
   */
  public open() {
    const appUrl = Cypress.env("ICONIC_APP_URL");
    cy.visit(appUrl);
  }

  // Cloudflare blocks the login, keeping for future reference but this doesn't work on production
  public signIn() {
    const email = Cypress.env("ICONIC_ACC_EMAIL");
    const password = Cypress.env("ICONIC_ACC_PASSWORD");

    cy.get('#content .button,[href="/customer/account/login"]').first().click();
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#btn-login").click();
  }

  /**
   * Wait for all loading indicators and elements to no longer be present
   * @param milliseconds
   */
  public hasFinishedLoading() {
    this.loading().should("have.length", 0);
  }
}

export { BasePageObject };
