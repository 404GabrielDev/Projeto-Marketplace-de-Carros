import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';



interface Car {
  id: number;
  name: string;
  brand: string;
  type: string;
  transmission: string;
  color: string;
  description: string;
  price: number;
  img : File | null;
  returnedImg: string;
  year: string;

  //RESOLVER PROBLEMA DE DIFERENTES TAMANHOS DE IMAGENS
  imageOrientation?:'horizontal' | 'vertical';
}



@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  cars:Car[] = []

  constructor(private service:AdminService) {}

  ngOnInit() {
    this.getCars();
  }


  getCars() {
    this.service.getAllCars().subscribe((res) => {
      this.cars = res

      this.cars.forEach((car) => {
        const img = new Image();
        img.src = 'data:image/jpeg;base64,' + car.returnedImg;

        img.onload = () => {
          car.imageOrientation = img.width > img.height ? 'horizontal' : 'vertical';

          img.onerror = (err) => {
            console.error('Erro ao carregar a imagem', err)
          }
        }
      })
    })
  }


}
