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

## Fluxo de API

O teste `tests/apis/demoqa-api.spec.ts` executa o fluxo completo em uma única execução:

1. Criação de um usuário com username único.
2. Geração do token.
3. Validação da autorização.
4. Listagem dos livros disponíveis.
5. Reserva de dois livros.
6. Consulta do usuário e validação dos livros associados.

O teste possui asserções para status HTTP, autorização, identificação do usuário e livros reservados. Assim, a execução falha automaticamente quando a API não retorna o comportamento esperado.

O desafio não exige um relatório formal em HTML, JUnit ou Allure. Por isso, o resultado padrão do Mocha no terminal é suficiente nesta etapa:

```text
1 passing
```

Relatórios formais podem ser adicionados posteriormente caso sejam necessários para integração contínua ou apresentação dos resultados.
