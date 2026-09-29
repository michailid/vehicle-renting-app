import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-add-new-vehicle',
  styleUrl: './add-new-vehicle.css',
  templateUrl: './add-new-vehicle.html',
})
export class AddNewVehicle {
  newVehicleObj = {
    CarId: 0,
    Brand: '',
    Model: '',
    Year: '',
    Color: '',
    DailyRate: '',
    CarImage: '',
    RegNo: '',
  };
  http = inject(HttpClient);
  router = inject(Router);

  onSaveVehicle() {
    this.http
      .post('https://freeapi.gerasim.in/api/CarRentalApp/CreateNewCar', this.newVehicleObj)
      .subscribe({
        next: (res) => {
          alert('Vehicle added successfully.');
          this.router.navigateByUrl('vehicles');
        },
        error: (error) => {
          alert('Error: ' + error);
        },
      });
  }

  onCancel() {
    this.newVehicleObj = {
      CarId: 0,
      Brand: '',
      Model: '',
      Year: '',
      Color: '',
      DailyRate: '',
      CarImage: '',
      RegNo: '',
    };
    this.router.navigateByUrl('vehicles');
  }
}
