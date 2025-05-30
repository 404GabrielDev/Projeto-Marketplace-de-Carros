import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const BASE_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient, private authService:AuthService) { }

  postCar(formData: FormData): Observable<any> {
    return this.http.post(BASE_URL + 'api/customer/car', formData, {
      withCredentials: true,
    });
  }

  getAllCars(): Observable<any> {
    return this.http.get(BASE_URL + 'api/customer/cars', {
      withCredentials: true,
    });
  }

  getMyCars(): Observable<any> {
    return this.http.get(BASE_URL + `api/customer/my-cars/${this.authService.getUserId()}`, {
      withCredentials: true,
    });
  }

  getMyBids(): Observable<any> {
    return this.http.get(BASE_URL + `api/customer/car/bids/${this.authService.getUserId()}`, {
      withCredentials: true,
    });
  }

  getBidsByCarId(carId:number): Observable<any> {
    return this.http.get(BASE_URL + `api/customer/car/${carId}/bids`, {
      withCredentials: true,
    });
  }

  getAnalytics(): Observable<any> {
    return this.http.get(BASE_URL + `api/customer/car/analytics/${this.authService.getUserId()}`, {
      withCredentials: true,
    });
  }



  updateBidStatus(bidId:number, status:string): Observable<any> {
    return this.http.get(BASE_URL + `api/customer/car/bid/${bidId}/${status}`, {
      withCredentials: true,
    });
  }

  deleteCar(id:number): Observable<any> {
    return this.http.delete(BASE_URL + `api/customer/deletecar/${id}`, {
      withCredentials: true,
    });
  }

   getCarById(id:number): Observable<any> {
    return this.http.get(BASE_URL + `api/customer/car/${id}`, {
      withCredentials: true,
    });
  }

  updateCar(id:number, formData:FormData): Observable<any> {
    return this.http.put(BASE_URL + `api/customer/car/${id}`, formData, {
      withCredentials: true,
    });
  }

  bidACar(bid: {price: string, userId: string, carId: number}):Observable<any> {
    return this.http.post(BASE_URL + 'api/customer/car/bid', bid, {
      withCredentials: true,
    })
  }

  searchCar(searchDto:any):Observable<any> {
    return this.http.post(BASE_URL + 'api/customer/car/search', searchDto, {
      withCredentials: true,
    })
  }

  getBids(id:string):Observable<any> {
    return this.http.get(BASE_URL + `api/customer/car/bids/${id}`, {
      withCredentials: true
    })
  }
}
