import { Routes } from '@angular/router';
import { LoginComponent } from './auth/auth-components/login/login.component';
import { SignupComponent } from './auth/auth-components/signup/signup.component';
import { authRoleGuardGuard } from './auth/guard/auth-role-guard.guard';
import { PostCarComponent } from './auth/modules/customer/components/post-car/post-car.component';
import { HomeComponent } from './pages/home/home.component';
import { HeroSectionComponent } from './pages/hero-section/hero-section.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: SignupComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path:'features',
    component: HeroSectionComponent,
  },

  {
    path: 'admin',
    canActivate: [authRoleGuardGuard], // protege a carga do módulo
    data: { role: 'ADMIN' }, // aqui passa a role esperada
    loadChildren: () =>
      import('./auth/modules/admin/admin.module').then((e) => e.AdminModule),
  },
  {
    path: 'customer',
    canActivate: [authRoleGuardGuard], // protege também
    data: { role: 'CUSTOMER' },
    loadChildren: () =>
      import('./auth/modules/customer/customer.module').then(
        (e) => e.CustomerModule
      ),
  },

   {
    path: '**',
    redirectTo: 'home',
  },
];
