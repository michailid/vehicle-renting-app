import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LOGGED_USER_KEY } from '../../constants/constants';
import { APIResponse } from '../../model/api-response.model';
import { Vehicle } from '../../model/vehicle.model';
import { Booking } from '../../model/booking.model';

@Component({
  imports: [RouterLink],
  selector: 'app-vehicles',
  styleUrl: './vehicles.css',
  templateUrl: './vehicles.html',
})
export class Vehicles implements OnInit {
  cars = signal<Vehicle[]>([]);
  http = inject(HttpClient);

  newBookingObj = new Booking();

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.http.get<APIResponse>('https://freeapi.gerasim.in/api/CarRentalApp/GetCars').subscribe({
      next: (response: APIResponse) => {
        this.cars.set(response.data);
      },
      error: (error: any) => {
        alert('Error: ' + error);
      },
    });
  }

  onDeleteVehicle(carId: number) {
    const wantsToDelete = confirm('Are you sure you want to delete this vehicle?');
    if (wantsToDelete) {
      this.http
        .delete(`https://freeapi.gerasim.in/api/CarRentalApp/DeleteCarbyCarId?carid=${carId}`)
        .subscribe({
          next: () => {
            alert('Successfully deleted vehicle.');
          },
          error: (error) => {
            alert('Error: ' + error);
          },
        });
    }
  }

  onBook(car: Vehicle) {
    if (localStorage.getItem(LOGGED_USER_KEY)) {
      const userData = JSON.parse(localStorage.getItem(LOGGED_USER_KEY)!);
      this.newBookingObj = {
        customerName: userData.customerName,
        customerCity: userData.customerCity,
        mobileNo: userData.mobileNo,
        email: userData.email,
        bookingId: 0,
        carId: car.carId,
        bookingDate: new Date().toDateString(),
        discount: 0,
        totalBillAmount: car.dailyRate,
      };
    }

    this.http
      .post('https://freeapi.gerasim.in/api/CarRentalApp/CreateNewBooking', this.newBookingObj)
      .subscribe({
        next: () => {
          alert('Vehicle booked successfully.');
        },
        error: (error) => {
          alert('Error: ' + error);
        },
      });
  }
}
