import { Component } from '@angular/core';
import { ApiService } from './api.service';

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
                        <input [(ngModel)] = "loginData.email" matInput placeholder = "email" name = "email">
                    </mat-form-field>
                    <mat-form-field>
                        <input [(ngModel)] = "loginData.pwd" matInput placeholder = "password" name = "password">
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

    constructor ( private apiService: ApiService) {}

    post() {
        this.apiService.loginUser(this.loginData);
    }
}
