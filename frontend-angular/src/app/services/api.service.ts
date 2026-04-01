import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://code-track-gmt9.onrender.com/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Auth
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  // Problems
  getProblems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/problems`, { headers: this.getHeaders() });
  }

  // Submissions
  submitCode(problemId: string, code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/submissions`, { problemId, code }, { headers: this.getHeaders() });
  }

  getMySubmissions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/submissions/my`, { headers: this.getHeaders() });
  }
}
