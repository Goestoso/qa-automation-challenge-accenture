import { By, WebDriver, WebElement, until } from 'selenium-webdriver';

export abstract class BasePage {
  constructor(protected readonly driver: WebDriver) {}

  protected async find(locator: By): Promise<WebElement> {
    return this.driver.wait(until.elementLocated(locator), 10_000);
  }

  protected async click(locator: By): Promise<void> {
    await (await this.find(locator)).click();
  }

  protected async type(locator: By, value: string): Promise<void> {
    const element = await this.find(locator);
    await element.clear();
    await element.sendKeys(value);
  }
}
