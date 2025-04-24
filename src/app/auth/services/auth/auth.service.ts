import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/';

interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private roleSubject = new BehaviorSubject<string | null>(null);

  public role$ = this.roleSubject.asObservable();

  setUserRole(role:string) {
    this.roleSubject.next(role);
  }

  getUserRole(): string | null {
    return this.roleSubject.value
  }

  isAdminLoggedIn(): boolean {
    return this.getUserRole() === 'ADMIN'
  }

  isCustomerLoggedIn(): boolean {
    return this.getUserRole() === 'CUSTOMER'
  }

  register(signupRequest: SignupRequest): Observable<any> {
    return this.http.post(BASE_URL + 'api/auth/signup', signupRequest, {
      withCredentials: true
    });
  }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(BASE_URL + 'api/auth/login', loginRequest, {
      withCredentials: true
    });
  }
}

