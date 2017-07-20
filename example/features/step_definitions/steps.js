const { defineSupportCode } = require('cucumber');
const { expect } = require('chai');

defineSupportCode(function({ Given, When, Then}) {
  Given('I am on the cucumber website', function () {
    return browser.driver.get('http://cucumber.io');
  });

  When('I go to Docs', function () {
    return browser.driver.findElement(by.linkText('Docs')).click();
  });

  Then('I should see the Docs heading', function () {
    return browser.driver.findElement(by.tagName('h1')).getText()
      .then(heading => {
        expect(heading).to.equal('Getting started with Cucumber');
      });
  });
});


