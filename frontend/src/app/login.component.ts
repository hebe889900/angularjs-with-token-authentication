import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'login',
  template: `
        <mat-card>
            <mat-card-header>
                <mat-card-title>
                    <h4>Login</h4>
                </mat-card-title>
            </mat-card-header>
            <mat-card-content>
                <form>        
                    <mat-form-field>
                        <input [(ngModel)] = "loginData.email" matInput placeholder = "email" name = "email" type = "email">
                    </mat-form-field>
                    <mat-form-field>
                        <input [(ngModel)] = "loginData.pwd" matInput placeholder = "password" name = "password" type = "password">
                    </mat-form-field>    
                    <button (click)="post()" mat-raised-button color = "accent">Login</button>        
                </form>            
            </mat-card-content>
        </mat-card>


  `,
  styleUrls: ['./app.component.css']
})
export class LoginComponent {
    loginData = {};

    constructor ( private authService: AuthService) {}

    post() {
        this.authService.loginUser(this.loginData);
    }
}
