import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';
import { HomePage } from '@src/pages/HomePage';
import { ProgressBarPage } from '@src/pages/ProgressBarPage';
import { createDriver } from '@src/utils/driver';

describe('DemoQA - Progress Bar', function () {
  this.timeout(35_000);

  let driver: WebDriver;

  beforeEach(async () => {
    driver = await createDriver();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('deve parar antes ou em 25%, completar e resetar', async () => {
    const homePage = new HomePage(driver);
    const progressBarPage = new ProgressBarPage(driver);

    await homePage.open();
    await homePage.openWidgets();
    await progressBarPage.openFromMenu();

    await progressBarPage.startOrStop();
    const stoppedValue = await progressBarPage.waitUntilValueIsAtMost(25);
    await progressBarPage.startOrStop();

    expect(stoppedValue).to.be.at.most(25);

    await progressBarPage.startOrStop();
    await progressBarPage.waitUntilComplete();

    expect(await progressBarPage.getValue()).to.equal(100);

    await progressBarPage.reset();
    await progressBarPage.waitUntilReset();

    expect(await progressBarPage.getValue()).to.equal(0);
  });
});
