import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./app.component.css']
})
export class RegisterComponent {
    registerData = {};

    constructor ( private authService: AuthService) {}

    post() {
        console.log(this.registerData);
        this.authService.registerUser(this.registerData);
    }
}
