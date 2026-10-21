import { HttpClient } from '@src/services/httpClient';

export interface CreateUserRequest { userName: string; password: string }
export interface UserResponse {
  userID: string;
  username: string;
  books: Array<{ isbn: string; title: string }>;
}

export class DemoQaAccountService {
  constructor(private readonly http = new HttpClient()) {}

  createUser(payload: CreateUserRequest) {
    return this.http.post<{ userID: string; username: string }>('/Account/v1/User', payload);
  }

  generateToken(payload: CreateUserRequest) {
    return this.http.post<{ token: string; expires: string; status: string; result: string }>(
      '/Account/v1/GenerateToken', payload,
    );
  }

  isAuthorized(token: string) {
    return this.http.post<boolean>('/Account/v1/Authorized', undefined, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getUser(userId: string, token: string) {
    return this.http.get<UserResponse>(`/Account/v1/User/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
