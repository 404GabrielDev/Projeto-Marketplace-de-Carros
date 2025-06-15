import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

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
  private apiUrlLogout = 'http://localhost:8080/api/auth/logout';


  private userId : string  = ""

  setUserId(id:string) {
    this.userId = id
  }
 
  getUserId(): string {
    return this.userId
  }



  constructor(private http: HttpClient, private router: Router) {}

  private roleSubject = new BehaviorSubject<string | null>(null);

  public role$ = this.roleSubject.asObservable();

  setUserRole(role: string) {
    this.roleSubject.next(role);
  }

  getUserRole(): string | null {
    return this.roleSubject.value;
  }


  isAdminLoggedIn(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  isCustomerLoggedIn(): boolean {
    return this.getUserRole() === 'CUSTOMER';
  }

  register(signupRequest: SignupRequest): Observable<any> {
    return this.http.post(BASE_URL + 'api/auth/signup', signupRequest, {
      withCredentials: true,
    });
  }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http
      .post(BASE_URL + 'api/auth/login', loginRequest, {
        withCredentials: true,
      })
      .pipe(
        tap((response: any) => {
          this.roleSubject.next(response.userRole);
          /*const userId = response.userId;
          localStorage.setItem('userId', userId);*/
        })
      );
  }

  logout(): Observable<string> {
    return this.http
      .get<string>(this.apiUrlLogout, { withCredentials: true })
      .pipe(
        tap(() => {
          this.roleSubject.next(null);
        })
      );
  }
}

//concertar esse logout pra remover o JWT corretamente.
