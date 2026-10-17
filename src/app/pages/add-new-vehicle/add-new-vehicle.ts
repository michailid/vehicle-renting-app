import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Vehicle } from '../../model/vehicle.model';
import { APIResponse } from '../../model/api-response.model';
import { Master } from '../../services/master';

@Component({
  imports: [FormsModule],
  selector: 'app-add-new-vehicle',
  styleUrl: './add-new-vehicle.css',
  templateUrl: './add-new-vehicle.html',
})
export class AddNewVehicle {
  newVehicleObj = new Vehicle();
  masterService = inject(Master);
  router = inject(Router);

  onSaveVehicle() {
    this.masterService.createNewVehicle(this.newVehicleObj).subscribe({
        next: (res: APIResponse) => {
          if (res.result) {
            alert('Vehicle added successfully.');
            this.router.navigateByUrl('vehicles');
          } else {
            alert(res.message);
          }
        },
        error: (error) => {
          alert('Error: ' + error);
        },
      });
  }

  onCancel() {
    this.newVehicleObj = new Vehicle();
    this.router.navigateByUrl('vehicles');
  }
}
