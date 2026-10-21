import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';
import { HomePage } from '@src/pages/HomePage';
import { PracticeFormPage, PracticeFormData } from '@src/pages/PracticeFormPage';
import { createDriver } from '@src/utils/driver';

describe('DemoQA - Practice Form', function () {
  this.timeout(45_000);

  let driver: WebDriver;

  beforeEach(async () => {
    driver = await createDriver();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('deve preencher e submeter o formulário', async () => {
    const homePage = new HomePage(driver);
    const practiceFormPage = new PracticeFormPage(driver);

    const timestamp = Date.now();
    const data: PracticeFormData = {
      firstName: 'Gabriel',
      lastName: 'QA',
      email: `qa_${timestamp}@example.com`,
      gender: 'Male',
      mobile: '11987654321',
      dateOfBirth: '01/15/1995',
      subject: 'Maths',
      address: 'Avenida de Testes, 100',
      state: 'NCR',
      city: 'Delhi',
    };

    await homePage.open();
    await homePage.openForms();
    await practiceFormPage.openFromFormsMenu();
    await practiceFormPage.fill(data);
    await practiceFormPage.submitForm();

    expect(await practiceFormPage.waitForConfirmation()).to.equal(true);
  });
});
