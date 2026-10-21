import { expect } from 'chai';
import { DemoQaAccountService } from '@src/services/demoqaAccountService';
import { DemoQaBookStoreService } from '@src/services/demoqaBookStoreService';
import { config } from '@src/utils/config';

describe('DemoQA - fluxo completo da API', () => {
  it('deve criar usuário, autorizar e reservar dois livros', async function () {
    this.timeout(15_000);

    const accountService = new DemoQaAccountService();
    const bookStoreService = new DemoQaBookStoreService();

    const username = `${config.apiUsername}_${Date.now()}`;
    const password = config.apiPassword;

    const credentials = {
      userName: username,
      password,
    };

    const createUserResponse = await accountService.createUser(credentials);

    expect(createUserResponse.status).to.equal(201);

    const userId = createUserResponse.data.userID;

    const tokenResponse = await accountService.generateToken(credentials);

    expect(tokenResponse.status).to.equal(200);
    expect(tokenResponse.data.status).to.equal('Success');

    const token = tokenResponse.data.token;

    const authorizedResponse =
      await accountService.isAuthorized(credentials);

    expect(authorizedResponse.status).to.equal(200);
    expect(authorizedResponse.data).to.equal(true);

    const booksResponse = await bookStoreService.listBooks();

    expect(booksResponse.status).to.equal(200);
    expect(booksResponse.data.books.length).to.be.greaterThanOrEqual(2);

    const selectedBooks = booksResponse.data.books.slice(0, 2);

    const addBooksResponse = await bookStoreService.addBooks(
      {
        userId,
        collectionOfIsbns: selectedBooks.map((book) => ({
          isbn: book.isbn,
        })),
      },
      token,
    );

    expect(addBooksResponse.status).to.equal(201);

    const userResponse = await accountService.getUser(userId, token);

    expect(userResponse.status).to.equal(200);
    expect(userResponse.data.userId).to.equal(userId);
    expect(userResponse.data.books).to.have.lengthOf(2);

    const reservedIsbns = userResponse.data.books.map(
      (book) => book.isbn,
    );

    for (const book of selectedBooks) {
      expect(reservedIsbns).to.include(book.isbn);
    }
  });
});
