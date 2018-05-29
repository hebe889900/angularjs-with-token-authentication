import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
    messages = [];

    constructor ( private http: Http) {

    }

    getMessages() {
        this.http.get('http://localhost:3000/posts').subscribe(res => {
            console.log(res);
            this.messages = res.json();
        })
    }

    sendUserRegistration(registerData) {
        this.http.post('http://localhost:3000/register', registerData).subscribe(res => {

        })
    }

    loginUser(loginData) {
        //this.http.post('http://localhost:3000/login', loginData).subscribe(res => {

        })
    }    
}