import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  //RESOLVER PROBLEMA DE DIFERENTES TAMANHOS DE IMAGENS
  imageOrientation?: 'horizontal' | 'vertical';
}

@Component({
  selector: 'app-update-car',
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
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.scss',
})
export class UpdateCarComponent implements OnInit {
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
  updateCarForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile!: File | null;
  imagePreview!: string | ArrayBuffer | null;

  //USANDO A LIB PRA REDIMENSIONAR A IMAGEM
  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';
  originalFileName!: string;
  image!: File | null;

  idCar!: number;

  Car!: Car;
  constructor(
    private service: CustomerService,
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
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
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  ngOnInit() {
    this.updateCarForm = this.fb.group({
      brand: [null, [Validators.required]],
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      transmission: [null, [Validators.required]],
      color: [null, [Validators.required]],
      year: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });

    this.idCar = Number(this.activatedRoute.snapshot.params['id']);
    this.getCars();
  }

  
  updateCar() {
    this.isSpinning = true;
    const formData: FormData = new FormData();

    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
      this.message.success("Imagem escolhida com sucesso")
    } else {
      this.message.info('Nenhuma imagem foi selecionada!');
    }

    

    formData.append('brand', this.updateCarForm.get('brand')?.value);
    formData.append('name', this.updateCarForm.get('name')?.value);
    formData.append('type', this.updateCarForm.get('type')?.value);
    formData.append('color', this.updateCarForm.get('color')?.value);

    
    const year = this.updateCarForm.get('year')?.value || '';
    formData.append('year', year);

    formData.append(
      'transmission',
      this.updateCarForm.get('transmission')?.value
    );
    formData.append(
      'description',
      this.updateCarForm.get('description')?.value
    );
    formData.append('price', this.updateCarForm.get('price')?.value);

    
    const userId = this.authService.getUserId();
    if (!userId) {
      this.message.error('ID do usuário não encontrado. Faça login novamente.');
      return;
    }
    const id = Number(userId);
    formData.append('userId', id.toString());
    //------------------

    this.service.updateCar(this.idCar, formData).subscribe({
      next: (res) => {
        this.message.success('Car updated successfully');
        this.router.navigate(['/customer/dashboard']);
      },
      error: (err) => {
        this.message.error('Something went wrong', err);
        for (const [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }
      },
      complete: () => {
        this.isSpinning = false;
      },
    });
  }

  getCars() {
    this.service.getCarById(this.idCar).subscribe((res) => {
      console.log("O que esta vindo aqui?", res);
      this.Car = res;

      this.updateCarForm.patchValue({
        brand: this.Car.brand,
        name: this.Car.name,
        type: this.Car.type,
        transmission: this.Car.transmission,
        color: this.Car.color,
        year: this.Car.year,
        description: this.Car.description,
        price: this.Car.price
      });

      
      const img = new Image();
      img.src = 'data:image/jpeg;base64,' + this.Car.returnedImg; // Imagem base64

      
      img.onload = () => {
        
        this.Car.imageOrientation =
          img.width > img.height ? 'horizontal' : 'vertical';
      };

      
      img.onerror = (err) => {
        console.error('Erro ao carregar a imagem', err);
      };

     
      if (!this.selectedFile) {
        const byteString = atob(this.Car.returnedImg);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const intArray = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
          intArray[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([intArray], { type: 'image/jpeg' });

        
        this.selectedFile = new File([blob], 'original-image.jpg', {
          type: 'image/jpeg',
        });
      } 

      console.log('Verificando todos os dados depois de atribuidos:', this.Car);
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
