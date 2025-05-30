import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService } from './auth/services/auth/auth.service';
import { NgIf } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    NzInputModule,
    NzFormModule,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'sellcar_angular';

  isAdminLoggedIn: Boolean = false;

  isCustomerLoggedIn: Boolean = false;

  constructor(private authService: AuthService, private router:Router) {}

    public getRole() : string | null {
      return this.authService.getUserRole()
    }

 logout() {
  this.authService.logout().subscribe({
    next: (message) => {
      console.log(message)
    },
    error: (err) => {
      console.log('Ocorreu um erro ao deslogar', err)
    }
  })
 }
}
