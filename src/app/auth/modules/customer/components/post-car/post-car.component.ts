import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {
  NzDatePickerModule,
  NzYearPickerComponent,
} from 'ng-zorro-antd/date-picker';
import { CommonModule } from '@angular/common';
import {
  ImageCropperComponent,
  ImageCroppedEvent,
  LoadedImage,
} from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser';
import { StorageService } from '../../../../services/storage/storage.service';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-post-car',
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
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.scss',
})
export class PostCarComponent {
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
    'PEOGEOT',
    'HONDA',
    'TOYOTA'
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
  postCarForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile!: File | null;
  imagePreview!: string | ArrayBuffer | null;


  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';
  originalFileName!: string;

  constructor(
    private service: CustomerService,
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {}

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;

    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.originalFileName = input.files[0].name;
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    if (event.blob) {
      
      this.selectedFile = new File(
        [event.blob],
        this.originalFileName || 'cropped-image.png',
        {
          type: event.blob.type,
        }
      );

      
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.blob)
      );
    }
  }
  imageLoaded(image: LoadedImage) {
    
  }
  cropperReady() {
    
  }
  loadImageFailed() {
    
  }

  ngOnInit() {
    this.postCarForm = this.fb.group({
      brand: [null, [Validators.required]],
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      transmission: [null, [Validators.required]],
      color: [null, [Validators.required]],
      year: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
  }

  postCar() {
    this.isSpinning = true;
    const formData: FormData = new FormData();
    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    } else {
      this.message.error('Por favor, selecione uma imagem.');
      return;
    }
    formData.append('brand', this.postCarForm.get('brand')?.value);
    formData.append('name', this.postCarForm.get('name')?.value);
    formData.append('type', this.postCarForm.get('type')?.value);
    formData.append('color', this.postCarForm.get('color')?.value);

    //CONVERTER VALOR PRA STRING PRA NÃO DAR PROBLEMA
    const rawYear: Date = this.postCarForm.get('year')?.value;
    const year = rawYear ? rawYear.getFullYear().toString() : '';
    formData.append('year', year);

    formData.append(
      'transmission',
      this.postCarForm.get('transmission')?.value
    );
    formData.append('description', this.postCarForm.get('description')?.value);
    formData.append('price', this.postCarForm.get('price')?.value);

    const userId = this.authService.getUserId();
    if (!userId) {
      this.message.error('ID do usuário não encontrado. Faça login novamente.');
      return;
    }

    formData.append('userId', userId);

    this.service.postCar(formData).subscribe({
      next: (res) => {
        this.message.success('Car posted successfully');
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

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
