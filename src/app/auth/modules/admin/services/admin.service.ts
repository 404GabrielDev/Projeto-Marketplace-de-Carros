import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private authService:AuthService) { }

  /*postCar(formData:FormData): Observable<any> {
    return this.http.post(BASE_URL + 'api/admin/car', formData, {
      withCredentials: true,
    });
  }
    */

  getAllCars(): Observable<any> {
    return this.http.get(BASE_URL + 'api/admin/cars', {
      withCredentials: true,
    })
  }

  getBids(): Observable<any> {
    return this.http.get(BASE_URL + "api/admin/cars/bids", {
      withCredentials: true
    })
  }
}
