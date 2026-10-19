import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LOGGED_USER_KEY } from '../../constants/constants';
import { APIResponse } from '../../model/api-response.model';
import { Vehicle } from '../../model/vehicle.model';
import { Booking } from '../../model/booking.model';
import { Master } from '../../services/master';

@Component({
  imports: [RouterLink],
  selector: 'app-vehicles',
  styleUrl: './vehicles.css',
  templateUrl: './vehicles.html',
})
export class Vehicles implements OnInit {
  cars = signal<Vehicle[]>([]);
  masterService = inject(Master);

  newBookingObj = new Booking();

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.masterService.getAllVehicles().subscribe({
      next: (response: APIResponse) => {
        if (response.result) {
          this.cars.set(response.data);
        } else {
          alert(response.message);
        }
      },
      error: (error: any) => {
        alert('Error: ' + error);
      },
    });
  }

  onDeleteVehicle(carId: number) {
    const wantsToDelete = confirm('Are you sure you want to delete this vehicle?');
    if (wantsToDelete) {
      this.masterService.deleteVehicle(carId).subscribe({
        next: (response: APIResponse) => {
          if (response.result) {
            this.getAllCars();
            alert('Successfully deleted vehicle.');
          } else {
            alert(response.message);
          }
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
        bookingUid: '',
        brand: car.brand,
        model: car.model,
      };
    }

    this.masterService.onCreateNewBooking(this.newBookingObj).subscribe({
      next: (response: APIResponse) => {
        if (response.result) {
          alert('Vehicle booked successfully.');
        } else {
          alert(response.message);
        }
      },
      error: (error) => {
        alert('Error: ' + error);
      },
    });
  }
}
