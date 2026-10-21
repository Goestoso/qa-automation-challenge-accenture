import { By, until, WebElement } from 'selenium-webdriver';
import { Select } from 'selenium-webdriver/lib/select';
import { BasePage } from '@src/pages/BasePage';

export interface WebTableRecord {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  salary: string;
  department: string;
}

export class WebTablesPage extends BasePage {
  private readonly webTablesMenu = By.xpath("//span[normalize-space()='Web Tables']");
  private readonly addRecordButton = By.id('addNewRecordButton');
  private readonly firstName = By.id('firstName');
  private readonly lastName = By.id('lastName');
  private readonly email = By.id('userEmail');
  private readonly age = By.id('age');
  private readonly salary = By.id('salary');
  private readonly department = By.id('department');
  private readonly submit = By.id('submit');
  private readonly rowsPerPage = By.css('select.form-control');

  async openFromMenu(): Promise<void> {
    await this.click(this.webTablesMenu);
  }

  async showMaximumRecordsPerPage(): Promise<void> {
    const selectElement = await this.find(this.rowsPerPage);
    const pageSize = new Select(selectElement);
    await pageSize.selectByValue('50');
    await this.driver.wait(async () => {
      return (await selectElement.getAttribute('value')) === '50';
    }, 5_000);
  }

  async addRecord(record: WebTableRecord): Promise<void> {
    await this.click(this.addRecordButton);
    await this.fillRecord(record);
    await this.click(this.submit);
    await this.driver.wait(
      async () => {
        const row = await this.driver.findElement(this.rowByEmail(record.email));
        return (await row.getText()).includes(record.firstName);
      },
      10_000,
    );
  }

  async editRecordByEmail(email: string, changes: Partial<WebTableRecord>): Promise<void> {
    const row = await this.findRowByEmail(email);
    await row.findElement(By.xpath(".//span[contains(@id,'edit-record')]")).click();

    const updatedRecord = {
      firstName: changes.firstName ?? await this.valueOf(this.firstName),
      lastName: changes.lastName ?? await this.valueOf(this.lastName),
      email: changes.email ?? email,
      age: changes.age ?? await this.valueOf(this.age),
      salary: changes.salary ?? await this.valueOf(this.salary),
      department: changes.department ?? await this.valueOf(this.department),
    };

    await this.fillRecord(updatedRecord);
    await this.click(this.submit);
  }

  async deleteRecordByEmail(email: string): Promise<void> {
    await this.showMaximumRecordsPerPage();
    const rows = await this.driver.findElements(this.rowByEmail(email));
    if (rows.length === 0) {
      return;
    }

    const row = rows[0];
    const deleteButton = await row.findElement(
      By.xpath(".//span[contains(@id,'delete-record')]"),
    );
    await this.driver.executeScript(
      'arguments[0].scrollIntoView({ block: "center" });',
      deleteButton,
    );
    await this.driver.executeScript(
      'arguments[0].click();',
      deleteButton,
    );

    await this.driver.wait(async () => {
      const rows = await this.driver.findElements(this.rowByEmail(email));
      return rows.length === 0;
    }, 10_000);
  }

  async rowContains(email: string, value: string): Promise<boolean> {
    const row = await this.findRowByEmail(email);
    return (await row.getText()).includes(value);
  }

  async rowExists(email: string): Promise<boolean> {
    const rows = await this.driver.findElements(this.rowByEmail(email));
    return rows.length > 0;
  }

  private async fillRecord(record: WebTableRecord): Promise<void> {
    await this.type(this.firstName, record.firstName);
    await this.type(this.lastName, record.lastName);
    await this.type(this.email, record.email);
    await this.type(this.age, record.age);
    await this.type(this.salary, record.salary);
    await this.type(this.department, record.department);
  }

  private async valueOf(locator: By): Promise<string> {
    return this.driver.findElement(locator).getAttribute('value') as Promise<string>;
  }

  private rowByEmail(email: string): By {
    return By.xpath(
      `//table//tbody//tr[.//td[normalize-space()='${email}']]`,
    );
  }

  private async findRowByEmail(email: string): Promise<WebElement> {
    return this.driver.wait(until.elementLocated(this.rowByEmail(email)), 10_000);
  }
}
