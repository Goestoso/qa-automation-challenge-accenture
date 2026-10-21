import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';
import { BrowserWindowsPage } from '@src/pages/BrowserWindowsPage';
import { HomePage } from '@src/pages/HomePage';
import { createDriver } from '@src/utils/driver';

describe('DemoQA - Browser Windows', function () {
  this.timeout(30_000);

  let driver: WebDriver;

  beforeEach(async () => {
    driver = await createDriver();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('deve abrir, validar e fechar uma nova janela', async () => {
    const homePage = new HomePage(driver);
    const browserWindowsPage = new BrowserWindowsPage(driver);

    await homePage.open();
    await homePage.openAlertsFrameWindows();
    await browserWindowsPage.openFromMenu();

    const { originalHandle } = await browserWindowsPage.openNewWindow();
    const message = await browserWindowsPage.readSampleMessage();

    expect(message).to.equal('This is a sample page');

    await browserWindowsPage.closeNewWindowAndReturn(originalHandle);
    expect(await driver.getWindowHandle()).to.equal(originalHandle);
  });
});
