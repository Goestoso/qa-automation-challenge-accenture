import dotenv from 'dotenv';

dotenv.config();

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) throw new Error(`A variável de ambiente ${name} é obrigatória.`);
  return value;
}

function booleanValue(name: string, fallback: boolean): boolean {
  const value = process.env[name];
  return value === undefined ? fallback : value.toLowerCase() === 'true';
}

function numberValue(name: string, fallback: number): number {
  const value = process.env[name];
  if (value === undefined) return fallback;
  const parsed = Number(value);
  if (Number.isNaN(parsed)) throw new Error(`${name} precisa ser numérica.`);
  return parsed;
}

export const config = {
  apiBaseUrl: required('API_BASE_URL', 'https://demoqa.com'),
  uiBaseUrl: required('UI_BASE_URL', 'https://demoqa.com'),
  browser: required('SELENIUM_BROWSER', 'chrome'),
  headless: booleanValue('HEADLESS', true),
  apiUsername: required('API_USERNAME', 'qa_automation_user'),
  apiPassword: required('API_PASSWORD', 'Qa@123456'),
  apiTimeoutMs: numberValue('API_TIMEOUT_MS', 15_000),
};
