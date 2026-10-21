import path from 'node:path';
import { By, Key, until } from 'selenium-webdriver';
import { config } from '@src/utils/config';
import { BasePage } from '@src/pages/BasePage';

export interface PracticeFormData {
  firstName: string;
  lastName: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
  dateOfBirth: string;
  subject: string;
  address: string;
  state: string;
  city: string;
}

export class PracticeFormPage extends BasePage {
  private readonly practiceFormMenu = By.xpath("//span[normalize-space()='Practice Form']");
  private readonly firstName = By.id('firstName');
  private readonly lastName = By.id('lastName');
  private readonly email = By.id('userEmail');
  private readonly mobile = By.id('userNumber');
  private readonly dateOfBirth = By.id('dateOfBirthInput');
  private readonly subjects = By.id('subjectsInput');
  private readonly address = By.id('currentAddress');
  private readonly upload = By.id('uploadPicture');
  private readonly submit = By.id('submit');
  private readonly stateInput = By.xpath("//div[@id='state']//input");
  private readonly cityInput = By.xpath("//div[@id='city']//input");
  private readonly visibleModal = By.css('.modal.show .modal-content');

  async open(): Promise<void> {
    await this.driver.get(`${config.uiBaseUrl}/automation-practice-form`);
  }

  async openFromFormsMenu(): Promise<void> {
    await this.click(this.practiceFormMenu);
  }

  async fill(data: PracticeFormData): Promise<void> {
    await this.type(this.firstName, data.firstName);
    await this.type(this.lastName, data.lastName);
    await this.type(this.email, data.email);
    await this.click(By.css("label[for='gender-radio-1']"));
    await this.type(this.mobile, data.mobile);

    await this.click(this.dateOfBirth);
    await this.type(this.dateOfBirth, data.dateOfBirth);
    await this.driver.findElement(this.dateOfBirth).sendKeys(Key.ENTER);

    await this.type(this.subjects, data.subject);
    await this.driver.findElement(this.subjects).sendKeys(Key.ENTER);

    await this.click(By.css("label[for='hobbies-checkbox-1']"));
    await this.driver.findElement(this.upload).sendKeys(
      path.resolve(process.cwd(), 'resources/files/upload.txt'),
    );
    await this.type(this.address, data.address);

    await this.selectReactOption(this.stateInput, data.state);
    await this.selectReactOption(this.cityInput, data.city);
  }

  async submitForm(): Promise<void> {
    await this.click(this.submit);
  }

  async waitForConfirmation(): Promise<boolean> {
    const modal = await this.driver.wait(
      until.elementLocated(this.visibleModal),
      10_000,
    );
    await this.driver.wait(until.elementIsVisible(modal), 10_000);
    return true;
  }

  private async selectReactOption(input: By, value: string): Promise<void> {
    await this.type(input, value);
    await this.driver.findElement(input).sendKeys(Key.ENTER);
  }
}
