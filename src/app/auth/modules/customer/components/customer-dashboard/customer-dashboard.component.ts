import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { NzCardModule } from 'ng-zorro-antd/card';

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
  sold: boolean;

  //RESOLVER PROBLEMA DE DIFERENTES TAMANHOS DE IMAGENS
  imageOrientation?: 'horizontal' | 'vertical';
  hasBid?: boolean;
  ownerTheCar?: boolean;
  userId: number;
}

interface Bid {
  id: number;
  price: number;
  bidStatus: string;
  carId: number;
  username: string;
  sellerName: string;
  carName: string;
  userId: number;
  resultBid: boolean;
}

interface carBidUser {
  carBidUser: number;
}

@Component({
  selector: 'app-customer-dashboard',
  imports: [CommonModule, RouterModule, NzCardModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss',
})
export class CustomerDashboardComponent {
  constructor(
    private service: CustomerService,
    private authService: AuthService
  ) {}
  cars: Car[] = [];
  userId!: string;
  bid: Bid[] = [];
  carBidUser: carBidUser[] = [];
  transformStrings!: string;
  idUserBid!: number;
  BidsByUser!: boolean;
  analytics: any;
  combinedCars: (Car & { bidResult?: Bid })[] = [];

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.getBidsUser();
    this.getAnalytics();
  }

  getBidsUser() {
    this.service.getBids(this.userId).subscribe((res) => {
      this.bid = res.map((bid: Bid) => {
        const stateBid = this.bid.some(
          (b) =>
            b.bidStatus === 'APROVED' ||
            b.bidStatus === 'REJECTED' ||
            b.bidStatus === 'PENDING'
        );
        return { ...bid, resultBid: stateBid };
      });
      this.getCars();
    });
  }

  getCars() {
    this.service.getAllCars().subscribe((res) => {
      this.cars = res.map((car: Car) => {
        const userHasBid = this.bid.some((b) => b.carId === car.id);
        const ownerCar = this.userId.toString() === car.userId.toString();

        return { ...car, hasBid: userHasBid, ownerTheCar: ownerCar };
      });

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


      this.combinedCars = this.cars.map((car) => {
      const bidResult = this.bid.find((b) => b.carId === car.id);
      return { ...car, bidResult };
    });

    });
  }

  getAnalytics() {
    this.service.getAnalytics().subscribe((res) => {
      this.analytics = res;
    });
  }

  gridStyle = {
    width: '50%',
    textAlign: 'center',
  };
}

//talvez desenvolver uma variavel global resolva o problema, um que verifique se o carId é igual o do bid

//tambem desenvolver uma logica que exiba o nome do leiloado, e se for o proprio usuario exibir algo semelhante.
