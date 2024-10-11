import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../model/authresponsemodel';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000';  // Replace with your backend URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          // Store the token in local storage
          if (response && response.access_token) {
            localStorage.setItem('token', response.access_token);
          }
        })
      );
  }

  logout() {
    // Remove the token from local storage
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    // Check if the user is logged in by checking if the token exists
    return !!localStorage.getItem('token');
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }
}
