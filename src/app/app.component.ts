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

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    NzInputModule,
    NzFormModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'sellcar_angular';

  isAdminLoggedIn: Boolean = false;

  isCustomerLoggedIn: Boolean = false;

  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    this.isAdminLoggedIn = this.authService.isAdminLoggedIn();

    this.isCustomerLoggedIn = this.authService.isCustomerLoggedIn();
  }

  //PROJETO PAUSADO PARA PEGAR MELHORES OS CONCEITOS DO ANGULAR ( PROJETO PAUSADO PARA REDIRECIONAMENTO DO DASHBOARD DE ACORDO COM A ROLE DELE ( ADMIN OU CUSTOMER ))
  
}
