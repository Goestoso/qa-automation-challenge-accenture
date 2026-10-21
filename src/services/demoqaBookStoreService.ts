import { HttpClient } from '@src/services/httpClient';

export interface Book {
  isbn: string;
  title: string;
}

export interface BooksResponse {
  books: Book[];
}

export interface AddBooksRequest {
  userId: string;
  collectionOfIsbns: Array<{ isbn: string }>;
}

export class DemoQaBookStoreService {
  constructor(private readonly http = new HttpClient()) {}

  listBooks() {
    return this.http.get<BooksResponse>('/BookStore/v1/Books');
  }

  addBooks(payload: AddBooksRequest, token: string) {
    return this.http.post('/BookStore/v1/Books', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}