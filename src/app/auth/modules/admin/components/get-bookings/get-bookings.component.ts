import { Component } from '@angular/core';
import { CustomerService } from '../../../customer/services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';

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

  imageOrientation?: 'horizontal' | 'vertical';
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
  carBrand: string;
}

@Component({
  selector: 'app-get-bookings',
  imports: [CommonModule, NzSpinModule, NzTableModule],
  templateUrl: './get-bookings.component.html',
  styleUrl: './get-bookings.component.scss',
})
export class GetBookingsComponent {
  cars: Car[] = [];
  bids: Bid[] = [];
  isSpinning: boolean = false;

  constructor(
    private service: CustomerService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.getBids();
  }

  getBids() {
    this.isSpinning = true;
    this.service.getMyBids().subscribe((res) => {
      console.log('Resposta do mybids aqui', res);
      this.bids = res;
      this.isSpinning = false;
    });
  }
}
