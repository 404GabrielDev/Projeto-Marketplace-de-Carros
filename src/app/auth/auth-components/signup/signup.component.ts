import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzSpinModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    RouterModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls:['./signup.component.scss'],
})
export class SignupComponent {
  signupForm!: FormGroup;

  get name() {
    return this.signupForm.get('name')!;
  }

  get email() {
    return this.signupForm.get('email')!;
  }

  get password() {
    return this.signupForm.get('password')!;
  }

  get confirmPassword() {
    return this.signupForm.get('passwordConfirm')!;
  }

  isSpinning: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  //entender validação personalizada

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) return { require: true };
    else if (control.value !== this.signupForm.controls['password'].value)
      return { confirm: true, error: true };
    return {};
  };

  signup() {
    this.service.register(this.signupForm.value).subscribe({
      next: (res) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}

//ENTENDER SE É POSSIVEL MIGRAR PRA COMPONENTES STANDALONE ESSES MODULOS E DEPOIS DESENVOLVER O ROUTE GUARDS E TESTAR A APLICAÇÃO.
