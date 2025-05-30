import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RouterModule } from '@angular/router';
interface Car {
  id: number;
  name: string;
  brand: string;
  type: string;
  transmission: string;
  color: string;
  description: string;
  price: number;
  img: File | null;
  returnedImg: string;
  year: string;
  sold:boolean;

  imageOrientation?: 'horizontal' | 'vertical';
}

@Component({
  selector: 'app-my-cars',
  imports: [CommonModule, NzButtonComponent, RouterModule],
  templateUrl: './my-cars.component.html',
  styleUrl: './my-cars.component.scss',
})
export class MyCarsComponent {
  cars: Car[] = [];

  constructor(
    private service: CustomerService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.service.getMyCars().subscribe((res) => {
      this.cars = res;

      this.cars.forEach((car) => {
        const img = new Image();
        img.src = 'data:image/jpeg;base64,' + car.returnedImg; 

        
        img.onload = () => {
          
          car.imageOrientation =
            img.width > img.height ? 'horizontal' : 'vertical';
        };

        
        img.onerror = (err) => {
          console.error('Erro ao carregar a imagem', err);
        };
      });
    });
  }

  deleteCar(id: number) {
    this.service.deleteCar(id).subscribe({
      next:(res) => {
        this.message.success("Car deleted successfully");
        this.getCars();
      },
      error: (err) => {
        this.message.error("Failed to delete the car!", err)
      }
    });
  }
}
