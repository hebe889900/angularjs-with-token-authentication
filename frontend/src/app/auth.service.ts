import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    messages = [];
    path = 'http://localhost:3000/auth';

    TOKEN_KEY = 'token';
    constructor ( private http: HttpClient) {

    }

    get token() {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    get isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    logout() {

    }
    registerUser(registerData) {
        this.http.post(this.path + '/register', registerData).subscribe(res => {

        })
    }

    loginUser(loginData) {
        this.http.post<any>(this.path + '/login', loginData).subscribe(res => {
            console.log(res);
            localStorage.setItem('token', res.token);
        })
    }    
}