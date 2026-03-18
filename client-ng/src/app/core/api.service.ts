import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_BASE = 'http://localhost:8080';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  login(payload: any): Observable<any> {
    return this.http.post(`${API_BASE}/api/user/login`, payload);
  }

  register(payload: any): Observable<any> {
    return this.http.post(`${API_BASE}/api/user/register`, payload);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${API_BASE}/api/user/users`);
  }

  getComments(postId: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_BASE}/api/comments/${postId}`);
  }

  addComment(postId: string, payload: any): Observable<any> {
    return this.http.post(`${API_BASE}/api/comments/${postId}`, payload);
  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${API_BASE}/api/comments/user/${id}`);
  }

  generateResume(userId: string): Observable<Blob> {
    return this.http.get(`${API_BASE}/api/resume/generate/${userId}`, {
      responseType: 'blob',
    });
  }
}

