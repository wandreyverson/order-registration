import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
    access_token: string;
}

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    private apiUrl = 'http://localhost:3000/api/auth';

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password });
    }

    saveToken(token: string) {
        localStorage.setItem('access_token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('access_token');
    }

    logout() {
        localStorage.removeItem('access_token');
    }
}
