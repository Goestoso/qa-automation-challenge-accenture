# QA Automation Challenge Accenture

Projeto base para o desafio de QA Automation da Accenture, usando TypeScript, Mocha/Chai, Selenium WebDriver e Axios.

## Arquitetura inicial

- `src/services`: comunicação HTTP e regras de serviço da API.
- `src/pages`: Page Objects da automação visual.
- `src/utils`: configuração, WebDriver e utilitários compartilhados.
- `tests/apis`: cenários de API.
- `tests/ui`: cenários de interface.
- `resources/files`: arquivos usados pelos testes.

## Execução

1. Copie `.env.example` para `.env` e ajuste os valores se necessário.
2. Instale as dependências com `npm install`.
3. Valide a fundação com `npm test`.
4. Execute API e UI separadamente com `npm run test:api` e `npm run test:ui`.

O teste inicial valida somente a configuração. Os fluxos do desafio serão adicionados incrementalmente.
