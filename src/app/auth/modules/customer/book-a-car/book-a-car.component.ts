import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../../services/auth/auth.service';
import { CustomerService } from '../services/customer.service';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {
  NzDatePickerModule,
  NzYearPickerComponent,
} from 'ng-zorro-antd/date-picker';
import { ImageCropperComponent } from 'ngx-image-cropper';

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
  userId: number

  //RESOLVER PROBLEMA DE DIFERENTES TAMANHOS DE IMAGENS
  imageOrientation?: 'horizontal' | 'vertical';

  //VERIFICANDO SE ELE TEM BID:
  hasBid?: boolean;
}

interface Bid {
  id: number;
  price: number;
  bidStatus: string;
  carId: number;
  username: string;
  sellerName: string;
  carName: string;
}

@Component({
  selector: 'app-book-a-car',
  imports: [
    CommonModule,
    NzSpinModule,
    NzFormModule,
    NzSelectModule,
    NzYearPickerComponent,
    ReactiveFormsModule,
    NzDatePickerModule,
    ImageCropperComponent,
  ],
  templateUrl: './book-a-car.component.html',
  styleUrl: './book-a-car.component.scss',
})
export class BookACarComponent {
  constructor(
    private service: CustomerService,
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  idCar!: number;
  Car!: Car;
  idBook!: number;
  bidForm!: FormGroup;
  isSpinning!: boolean;
  userId!: string;
  bid: Bid[] = [];
  transformStrings!: string;

  ngOnInit() {
    this.bidForm = this.fb.group({
      price: [null, [Validators.required]],
    });
    //takes the carId
    this.idCar = Number(this.activatedRoute.snapshot.params['id']);

    this.userId = this.authService.getUserId();

    this.getBidsUser();
    this.getCarById();
  }

  //colocar pra rodar
  getCarById() {
    this.service.getCarById(this.idCar).subscribe((car:Car) => {
      const userHasBid = this.bid.some((b) => b.carId === car.id);
      this.Car = {...car, hasBid:userHasBid};
    });
  }

  getBidsUser() {
    this.service.getBids(this.userId).subscribe((res) => {
      this.bid = res;
    });
  }

  bidACar(formData: any) {
    this.isSpinning = true;
    const userId = this.authService.getUserId();

    const bid = {
      price: formData.price,
      userId: this.authService.getUserId(),
      carId: this.idCar,
    };

    this.service.bidACar(bid).subscribe({
      next: (res) => {
        this.message.success('Bid submitted successfully');
        this.router.navigate(['/customer/dashboard']);
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


//CORRIGI A BAGUNÇA DESSE ARQUIVO, COM A LOGICA DO HTML DE MOSTRAR OS BIDS
