import { By } from 'selenium-webdriver';
import { config } from '@src/utils/config';
import { BasePage } from '@src/pages/BasePage';

export class HomePage extends BasePage {
  private readonly formsCard = By.xpath("//div[contains(@class,'card-body')]/h5[normalize-space()='Forms']");
  private readonly alertsFrameWindowsCard = By.xpath(
    "//div[contains(@class,'card-body')]/h5[normalize-space()='Alerts, Frame & Windows']",
  );
  private readonly elementsCard = By.xpath(
    "//div[contains(@class,'card-body')]/h5[normalize-space()='Elements']",
  );
  private readonly widgetsCard = By.xpath(
    "//div[contains(@class,'card-body')]/h5[normalize-space()='Widgets']",
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

  async openElements(): Promise<void> {
    await this.click(this.elementsCard);
  }

  async openWidgets(): Promise<void> {
    await this.click(this.widgetsCard);
  }
}
