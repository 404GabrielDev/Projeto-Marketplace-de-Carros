import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-manage-bids',
  imports: [NzSpinModule, NzTableModule, CommonModule],
  templateUrl: './manage-bids.component.html',
  styleUrl: './manage-bids.component.scss',
})
export class ManageBidsComponent {
  cars: Car[] = [];
  bids: Bid[] = [];
  carId!:number;
  isSpinning: boolean = false;

  constructor(
    private service: CustomerService,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.carId = this.activatedRoute.snapshot.params['id']
    this.getBids();
  }

  getBids() {
    this.isSpinning = true;
    this.service.getBidsByCarId(this.carId).subscribe((res) => {
      this.bids = res;
      this.isSpinning = false;
    });
  }

  changeBookingStatus(id: number, status: string) {
    this.isSpinning = true;
    this.service.updateBidStatus(id, status).subscribe({
      next: (res) => {
        this.isSpinning = false;
        this.message.success('Bid status changed successfully');
        this.getBids();
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
