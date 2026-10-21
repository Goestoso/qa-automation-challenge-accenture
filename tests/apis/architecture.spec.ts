import { expect } from 'chai';
import { config } from '@src/utils/config';

describe('configuração do projeto', () => {
  it('carrega a URL da API do ambiente', () => {
    expect(config.apiBaseUrl).to.equal('https://demoqa.com');
  });
});
