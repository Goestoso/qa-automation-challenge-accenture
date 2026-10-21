import { By, until } from 'selenium-webdriver';
import { BasePage } from '@src/pages/BasePage';

export class ProgressBarPage extends BasePage {
  private readonly progressBarMenu = By.xpath("//span[normalize-space()='Progress Bar']");
  private readonly progressValue = By.css("#progressBar [role='progressbar']");
  private readonly startStopButton = By.id('startStopButton');
  private readonly resetButton = By.id('resetButton');

  async openFromMenu(): Promise<void> {
    await this.click(this.progressBarMenu);
  }

  async startOrStop(): Promise<void> {
    await this.click(this.startStopButton);
  }

  async reset(): Promise<void> {
    await this.driver.wait(until.elementLocated(this.resetButton), 10_000);
    await this.click(this.resetButton);
  }

  async getValue(): Promise<number> {
    const progress = await this.driver.wait(
      until.elementLocated(this.progressValue),
      10_000,
    );
    const value = await progress.getAttribute('aria-valuenow');
    return Number(value);
  }

  async waitUntilValueIsAtMost(maximum: number): Promise<number> {
    await this.driver.wait(async () => {
      const value = await this.getValue();
      return value > 0 && value <= maximum;
    }, 10_000);

    return this.getValue();
  }

  async waitUntilComplete(): Promise<void> {
    await this.driver.wait(async () => (await this.getValue()) === 100, 15_000);
  }

  async waitUntilReset(): Promise<void> {
    await this.driver.wait(async () => (await this.getValue()) === 0, 10_000);
  }
}
