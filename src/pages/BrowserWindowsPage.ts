import { By, until, WebDriver } from 'selenium-webdriver';
import { BasePage } from '@src/pages/BasePage';

export class BrowserWindowsPage extends BasePage {
  private readonly browserWindowsMenu = By.xpath(
    "//span[normalize-space()='Browser Windows']",
  );
  private readonly newWindowButton = By.id('windowButton');
  private readonly sampleHeading = By.id('sampleHeading');

  async openFromMenu(): Promise<void> {
    await this.click(this.browserWindowsMenu);
  }

  async openNewWindow(): Promise<{ originalHandle: string; newHandle: string }> {
    const originalHandle = await this.driver.getWindowHandle();
    const currentHandles = await this.driver.getAllWindowHandles();

    await this.click(this.newWindowButton);

    await this.driver.wait(async () => {
      const handles = await this.driver.getAllWindowHandles();
      return handles.length > currentHandles.length;
    }, 10_000);

    const handles = await this.driver.getAllWindowHandles();
    const newHandle = handles.find((handle) => handle !== originalHandle);

    if (!newHandle) {
      throw new Error('A nova janela não foi encontrada.');
    }

    await this.driver.switchTo().window(newHandle);
    return { originalHandle, newHandle };
  }

  async readSampleMessage(): Promise<string> {
    const heading = await this.driver.wait(
      until.elementLocated(this.sampleHeading),
      10_000,
    );
    return heading.getText();
  }

  async closeNewWindowAndReturn(originalHandle: string): Promise<void> {
    await this.driver.close();
    await this.driver.switchTo().window(originalHandle);
  }
}
