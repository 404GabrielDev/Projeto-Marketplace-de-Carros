import { Component} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService } from './auth/services/auth/auth.service';
import { NgIf } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerDashboardComponent } from './auth/modules/customer/components/customer-dashboard/customer-dashboard.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    NzInputModule,
    NzFormModule,
    NgIf,
    CustomerDashboardComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'sellcar_angular';

  isAdminLoggedIn: Boolean = false;

  isCustomerLoggedIn: Boolean = false;

  constructor(private authService: AuthService, private router:Router, private message:NzMessageService) {}

    public getRole() : string | null {
      return this.authService.getUserRole()
    }

 logout() {
  this.authService.logout().subscribe({
    next: (message) => {
      this.message.success("Successfully logged out")
      console.log(message)
    },
    error: (err) => {
      this.message.error("Error logged out")
      console.log('Ocorreu um erro ao deslogar', err)
    }
  })
 }
}
