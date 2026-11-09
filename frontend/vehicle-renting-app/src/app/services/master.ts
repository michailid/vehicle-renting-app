import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../model/api-response.model';
import { Booking } from '../model/booking.model';
import { Customer } from '../model/customer.model';
import { Vehicle } from '../model/vehicle.model';
import { environment } from '../../environments/environment.development';
import { API_METHOD } from '../constants/constants';

@Service()
export class Master {
  http = inject(HttpClient);
  api_url = environment.API_URL;

  getDashboardData(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.api_url + API_METHOD.GET_DASHBOARD_DATA);
  }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.api_url + API_METHOD.GET_CARS);
  }

  createNewVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.api_url + API_METHOD.CREATE_NEW_CAR, vehicle);
  }

  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(
      this.api_url + API_METHOD.UPDATE_CAR + '/' + vehicle.carId,
      vehicle,
    );
  }

  deleteVehicle(carId: number): Observable<void> {
    return this.http.delete<void>(this.api_url + API_METHOD.DELETE_CAR_BY_CAR_ID + '/' + carId);
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.api_url + API_METHOD.GET_CUSTOMERS);
  }

  createNewCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.api_url + API_METHOD.CREATE_NEW_CUSTOMER, customer);
  }

  deleteCustomer(customerId: number): Observable<void> {
    return this.http.delete<void>(
      this.api_url + API_METHOD.DELETE_CUSTOMER_BY_ID + '/' + customerId,
    );
  }

  updateCustomer(customer: Customer | null): Observable<Customer> {
    return this.http.put<Customer>(
      this.api_url + API_METHOD.UPDATE_CUSTOMER + '/' + customer?.customerId,
      customer,
    );
  }

  getAllBookings(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.api_url + API_METHOD.GET_ALL_BOOKINGS);
  }

  deleteBooking(bookingId: number): Observable<APIResponse> {
    return this.http.delete<APIResponse>(
      this.api_url + API_METHOD.DELETE_BOOKING_BY_ID + '?id=' + bookingId,
    );
  }

  onCreateNewBooking(newBookingObj: Booking): Observable<APIResponse> {
    return this.http.post<APIResponse>(this.api_url + API_METHOD.CREATE_NEW_BOOKING, newBookingObj);
  }
}
