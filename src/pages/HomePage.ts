import { By } from 'selenium-webdriver';
import { config } from '@src/utils/config';
import { BasePage } from '@src/pages/BasePage';

export class HomePage extends BasePage {
  private readonly formsCard = By.xpath("//div[contains(@class,'card-body')]/h5[normalize-space()='Forms']");
  private readonly alertsFrameWindowsCard = By.xpath(
    "//div[contains(@class,'card-body')]/h5[normalize-space()='Alerts, Frame & Windows']",
  );

  async open(): Promise<void> {
    await this.driver.get(config.uiBaseUrl);
  }

  async openForms(): Promise<void> {
    await this.click(this.formsCard);
  }

  async openAlertsFrameWindows(): Promise<void> {
    await this.click(this.alertsFrameWindowsCard);
  }
}
