import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../model/api-response.model';
import { Booking } from '../model/booking.model';
import { Customer } from '../model/customer.model';
import { Vehicle } from '../model/vehicle.model';

@Service()
export class Master {
  http = inject(HttpClient);

  getDashboardData(): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      'https://freeapi.gerasim.in/api/CarRentalApp/GetDashboardData',
    );
  }

  getAllVehicles(): Observable<APIResponse> {
    return this.http.get<APIResponse>('https://freeapi.gerasim.in/api/CarRentalApp/GetCars');
  }

  createNewVehicle(vehicle: Vehicle): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      'https://freeapi.gerasim.in/api/CarRentalApp/CreateNewCar',
      vehicle,
    );
  }

  updateVehicle(vehicle: Vehicle): Observable<APIResponse> {
    return this.http.put<APIResponse>(
      'https://freeapi.gerasim.in/api/CarRentalApp/UpdateCar',
      vehicle,
    );
  }

  deleteVehicle(carId: number): Observable<APIResponse> {
    return this.http.delete<APIResponse>(
      'https://freeapi.gerasim.in/api/CarRentalApp/DeleteCarbyCarId?carid=' + carId,
    );
  }

  getAllCustomers(): Observable<APIResponse> {
    return this.http.get<APIResponse>('https://freeapi.gerasim.in/api/CarRentalApp/GetCustomers');
  }

  createNewCustomer(customer: Customer): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      'https://freeapi.gerasim.in/api/CarRentalApp/CreateNewCustomer',
      customer,
    );
  }

  deleteCustomer(customerId: number): Observable<APIResponse> {
    return this.http.delete<APIResponse>(
      `https://freeapi.gerasim.in/api/CarRentalApp/DeletCustomerById?id=${customerId}`,
    );
  }

  updateCustomer(customer: Customer | null): Observable<APIResponse> {
    return this.http.put<APIResponse>(
      'https://freeapi.gerasim.in/api/CarRentalApp/UpdateCustomer',
      customer,
    );
  }

  getAllBookings(): Observable<APIResponse> {
    return this.http.get<APIResponse>('https://freeapi.gerasim.in/api/CarRentalApp/geAllBookings');
  }

  deleteBooking(bookingId: number): Observable<APIResponse> {
    return this.http.delete<APIResponse>(
      `https://freeapi.gerasim.in/api/CarRentalApp/DeletBookingById?id=${bookingId}`,
    );
  }

  onCreateNewBooking(newBookingObj: Booking): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      'https://freeapi.gerasim.in/api/CarRentalApp/CreateNewBooking',
      newBookingObj,
    );
  }
}
