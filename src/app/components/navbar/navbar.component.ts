import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CustomerDashboardComponent } from '../../auth/modules/customer/components/customer-dashboard/customer-dashboard.component';
import { AuthService } from '../../auth/services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    NzInputModule,
    NzFormModule,
    NgIf,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
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
