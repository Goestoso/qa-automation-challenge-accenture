import { By, until, WebElement } from 'selenium-webdriver';
import { BasePage } from '@src/pages/BasePage';

export class SortablePage extends BasePage {
  private readonly sortableMenu = By.xpath("//span[normalize-space()='Sortable']");
  private readonly items = By.css('#demo-tabpane-list .list-group-item');

  async openFromMenu(): Promise<void> {
    await this.click(this.sortableMenu);
  }

  async getItems(): Promise<string[]> {
    const elements = await this.driver.findElements(this.items);
    return Promise.all(elements.map((element) => element.getText()));
  }

  async dragItemBefore(sourceText: string, targetText: string): Promise<void> {
    const source = await this.findItem(sourceText);
    const target = await this.findItem(targetText);

    await this.driver.actions({ async: true }).dragAndDrop(source, target).perform();
  }

  async sortAscending(): Promise<void> {
    const expectedOrder = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

    for (let index = 0; index < expectedOrder.length; index += 1) {
      const currentOrder = await this.getItems();
      if (currentOrder[index] === expectedOrder[index]) continue;

      await this.dragItemBefore(expectedOrder[index], currentOrder[index]);

      await this.driver.wait(async () => {
        const updatedOrder = await this.getItems();
        return updatedOrder[index] === expectedOrder[index];
      }, 10_000);
    }
  }

  private async findItem(text: string): Promise<WebElement> {
    return this.driver.wait(
      until.elementLocated(
        By.xpath(`//div[@id='demo-tabpane-list']//div[contains(@class,'list-group-item') and normalize-space()='${text}']`),
      ),
      10_000,
    );
  }
}
