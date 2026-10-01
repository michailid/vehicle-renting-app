import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LOGGED_USER_KEY } from '../../constants/constants';

@Component({
  imports: [RouterLink],
  selector: 'app-vehicles',
  styleUrl: './vehicles.css',
  templateUrl: './vehicles.html',
})
export class Vehicles implements OnInit {
  cars: any = signal<[]>([]);
  http = inject(HttpClient);

  newBookingObj = {
    CustomerName: '',
    CustomerCity: '',
    MobileNo: '',
    Email: '',
    BookingId: 0,
    CarId: 0,
    BookingDate: '',
    Discount: 0,
    TotalBillAmount: 0,
  };

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.http.get('https://freeapi.gerasim.in/api/CarRentalApp/GetCars').subscribe({
      next: (response: any) => {
        this.cars.set(response.data);
      },
      error: (error) => {
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

  onBook(car: any) {
    if (localStorage.getItem(LOGGED_USER_KEY)) {
      const userData = JSON.parse(localStorage.getItem(LOGGED_USER_KEY)!);
      this.newBookingObj = {
        CustomerName: userData.customerName,
        CustomerCity: userData.customerCity,
        MobileNo: userData.mobileNo,
        Email: userData.email,
        BookingId: 0,
        CarId: car.carId,
        BookingDate: new Date().toDateString(),
        Discount: 0,
        TotalBillAmount: car.dailyRate,
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
