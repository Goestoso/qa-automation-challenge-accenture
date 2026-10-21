import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';
import { HomePage } from '@src/pages/HomePage';
import { WebTablesPage, WebTableRecord } from '@src/pages/WebTablesPage';
import { createDriver } from '@src/utils/driver';

describe('DemoQA - Web Tables', function () {
  this.timeout(30_000);

  let driver: WebDriver;

  beforeEach(async () => {
    driver = await createDriver();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('deve criar, editar e excluir um registro', async () => {
    const homePage = new HomePage(driver);
    const webTablesPage = new WebTablesPage(driver);

    const email = `qa_${Date.now()}@example.com`;
    const record: WebTableRecord = {
      firstName: 'Gabriel',
      lastName: 'Automation',
      email,
      age: '30',
      salary: '8000',
      department: 'Quality Assurance',
    };

    await homePage.open();
    await homePage.openElements();
    await webTablesPage.openFromMenu();

    await webTablesPage.addRecord(record);
    expect(await webTablesPage.rowContains(email, 'Gabriel')).to.equal(true);

    await webTablesPage.editRecordByEmail(email, { salary: '9000' });
    expect(await webTablesPage.rowContains(email, '9000')).to.equal(true);

    await webTablesPage.deleteRecordByEmail(email);
  });
});
