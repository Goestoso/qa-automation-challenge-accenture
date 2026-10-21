import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';
import { HomePage } from '@src/pages/HomePage';
import { SortablePage } from '@src/pages/SortablePage';
import { createDriver } from '@src/utils/driver';

describe('DemoQA - Sortable', function () {
  this.timeout(35_000);

  let driver: WebDriver;

  beforeEach(async () => {
    driver = await createDriver();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('deve ordenar os elementos em ordem crescente usando drag and drop', async () => {
    const homePage = new HomePage(driver);
    const sortablePage = new SortablePage(driver);

    await homePage.open();
    await homePage.openInteractions();
    await sortablePage.openFromMenu();

    await sortablePage.dragItemBefore('Six', 'One');
    await sortablePage.sortAscending();

    expect(await sortablePage.getItems()).to.deep.equal([
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
    ]);
  });
});
