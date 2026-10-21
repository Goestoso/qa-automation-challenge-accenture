import { Builder, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { config } from '@src/utils/config';

export async function createDriver(): Promise<WebDriver> {
  const builder = new Builder().forBrowser(config.browser);
  if (config.browser === 'chrome') {
    const options = new chrome.Options();
    if (config.headless) options.addArguments('--headless=new');
    options.addArguments('--window-size=1920,1080');
    builder.setChromeOptions(options);
  }
  return builder.build();
}
