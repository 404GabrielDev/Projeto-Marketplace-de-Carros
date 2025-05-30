import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../../../services/auth/auth.service';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';



@Component({
  selector: 'app-search-car',
  imports: [CommonModule, NzSpinModule, ReactiveFormsModule, NzFormModule, NzSelectModule],
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.scss'
})
export class SearchCarComponent {

  listOfBrands = [
    'BMW',
    'AUDI',
    'FERRARI',
    'TESLA',
    'VOLVO',
    'FORD',
    'NISSAN',
    'HYUNDAI',
    'LEXUS',
    'KIA',
    'HAVAL',
    'SUBARU',
    'VOLKSWAGEN',
  ];
  listOfType = ['Petrol', 'Hybrid', 'Diesel', 'CNG', 'Eletric'];
  listOfColors = [
    'Black',
    'White',
    'Silver',
    'Gray',
    'Blue',
    'Red',
    'Green',
    'Yellow',
    'Orange',
    'Brown',
  ];
  listOfTransmission = ['Manual', 'Automatic'];
  searchCarForm!: FormGroup;
  isSpinning: boolean = false;
  cars:any[]=[]

   constructor(
      private service: CustomerService,
      private fb: FormBuilder,
    ) {}


  ngOnInit() {
    this.searchCarForm = this.fb.group({
      brand: [null],
      type: [null],
      transmission: [null],
      color: [null],
    });
  }

  searchCar() {
    this.isSpinning = true
    this.cars = [];
    this.service.searchCar(this.searchCarForm.value).subscribe((res) => {
      this.isSpinning = false;
      this.cars=res;
    })
  }

}
