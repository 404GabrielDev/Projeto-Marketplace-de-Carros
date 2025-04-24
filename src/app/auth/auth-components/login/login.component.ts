import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NzSpinModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  get name() {
    return this.loginForm.get('name')!;
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  get confirmPassword() {
    return this.loginForm.get('passwordConfirm')!;
  }

  isSpinning: boolean = false;

  constructor(private fb: FormBuilder, private service: AuthService, private router:Router, private message: NzMessageService) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe({
      next:(res) => {
        console.log(res);
        this.service.setUserRole(res.user_role);
        this.message.success('Login realizado com sucesso!')
        if(res.userRole === 'CUSTOMER') {
          this.router.navigate(['/customer/dashboard'])
        } else if(res.userRole === 'ADMIN') {
          this.router.navigate(['admin/dashboard'])
        } else {
          console.error('User role desconhecido')
        }
      },
      error: (err) => {
        console.error(err);
        this.message.error('Falha ao realizar o login. Verifique suas credenciais!')
        this.isSpinning=false;
      }
    })
  }
}
