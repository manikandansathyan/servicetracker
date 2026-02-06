import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Apiservice {
  baseURL: string = "http://localhost:3000/users";
  vehicleURL: string = "http://localhost:3000/vehicles"

  constructor(private http: HttpClient) { }


  getUserByEmail(email: string) {
    return this.http.get<any[]>(`${this.baseURL}?email=${email}`);
  }


  registerUser(user: any) {
    return this.http.post(this.baseURL, user);
  }

  loginUser(email: string, pswd: string) {
    return this.http.get<any[]>(`${this.baseURL}?email=${email}&pswd=${pswd}`);
  }

  addvehicle(vehicles: any) {
    return this.http.post(this.vehicleURL, vehicles)
  }

  getVehicles() {
    return this.http.get(this.vehicleURL);
  }
  
  updateVehicle(id: number, vehicle: any) {
    return this.http.put(`${this.vehicleURL}/${id}`, vehicle);
  }

  deleteVehicle(id: number) {
    return this.http.delete(`${this.vehicleURL}/${id}`);
  }

}
