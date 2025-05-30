import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';




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
  carBrand:string
}

@Component({
  selector: 'app-view-my-bids',
  imports: [NzSpinModule, NzTableModule, CommonModule],
  templateUrl: './view-my-bids.component.html',
  styleUrl: './view-my-bids.component.scss',
})
export class ViewMyBidsComponent {
  cars: Car[] = [];
  bids: Bid[] = [];
  isSpinning:boolean = false

  constructor(
    private service: CustomerService,
    private message: NzMessageService,
    private router:Router
  ) {}

  ngOnInit() {
    this.getBids();
  }

  getBids() {
    this.isSpinning = true
    this.service.getMyBids().subscribe((res) => {
      this.bids = res;
      this.isSpinning = false
    });
  }

  changeBookingStatus(id:number, status:string) {
    this.isSpinning = true
    this.service.updateBidStatus(id, status).subscribe({
      next: (res) => {
        this.isSpinning = false
        this.message.success('Bid status changed successfully');
        this.getBids()
      },
      error: (err) => {
        this.message.error('Something went wrong', err);
      },
      complete: () => {
        this.isSpinning = false;
      },
    });
  }
}
