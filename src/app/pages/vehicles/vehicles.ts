import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-vehicles',
  styleUrl: './vehicles.css',
  templateUrl: './vehicles.html',
})
export class Vehicles implements OnInit {
  cars: any = signal<[]>([]);
  http = inject(HttpClient);

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
}
