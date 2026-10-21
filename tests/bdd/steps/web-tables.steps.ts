import {
  Before,
  After,
  Given,
  When,
  Then,
  setDefaultTimeout,
} from '@cucumber/cucumber';
import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';

import { createDriver } from '@src/utils/driver';
import {
  WebTableRecord,
  WebTablesPage,
} from '@src/pages/WebTablesPage';
import { HomePage } from '@src/pages/HomePage';

let driver: WebDriver;
let webTablesPage: WebTablesPage;
let records: WebTableRecord[] = [];

setDefaultTimeout(30_000);

Before(async () => {
  driver = await createDriver();
});

After(async () => {
  await driver.quit();
});

Given('que estou na página Web Tables', async () => {
  const homePage = new HomePage(driver);
  webTablesPage = new WebTablesPage(driver);

  await homePage.open();
  await homePage.openElements();
  await webTablesPage.openFromMenu();
  await webTablesPage.showMaximumRecordsPerPage();
});

When(
  'eu crio {int} registros dinamicamente',
  async (quantity: number) => {
    records = Array.from({ length: quantity }, (_, index) => ({
      firstName: `QA${index + 1}`,
      lastName: 'Automation',
      email: `qa_${Date.now()}_${index}@example.com`,
      age: String(20 + index),
      salary: String(5000 + index * 100),
      department: 'Quality Assurance',
    }));

    for (const record of records) {
      await webTablesPage.addRecord(record);
    }
  },
);

Then(
  'os {int} registros devem estar visíveis',
  async (quantity: number) => {
    expect(records).to.have.lengthOf(quantity);

    for (const record of records) {
      const visible = await webTablesPage.rowContains(
        record.email,
        record.firstName,
      );

      expect(visible, `Registro não localizado: ${record.email}`).to.equal(true);
    }
  },
);

When('eu excluo os 12 registros criados', async () => {
  for (const record of [...records].reverse()) {
    await webTablesPage.deleteRecordByEmail(record.email);
  }
});

Then(
  'nenhum dos registros deve permanecer',
  async () => {
    for (const record of records) {
      expect(await webTablesPage.rowExists(record.email)).to.equal(false);
    }
  },
);
