import { Component} from '@angular/core';
import { HomeComponent } from "./pages/home/home.component";
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent, RouterModule,
    FooterComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
}
