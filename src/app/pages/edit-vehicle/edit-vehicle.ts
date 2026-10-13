import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from '../../model/vehicle.model';

@Component({
  imports: [FormsModule],
  selector: 'app-edit-vehicle',
  styleUrl: './edit-vehicle.css',
  templateUrl: './edit-vehicle.html',
})
export class EditVehicle implements OnInit {
  updateVehicleObj = new Vehicle();
  router = inject(Router);
  http = inject(HttpClient);
  cdr = inject(ChangeDetectorRef);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // get the list of all cars and find the current car
    this.http
      .get('https://freeapi.gerasim.in/api/CarRentalApp/GetCars')
      .subscribe((response: any) => {
        const found = response.data.find((c: Vehicle) => c.carId === id);
        if (found) {
          this.updateVehicleObj = { ...found }; // copy for editing
          this.cdr.markForCheck(); // refresh the UI
        } else {
          this.router.navigate(['/vehicles']);
          alert('Vehicle not found.');
        }
      });
  }

  onUpdateVehicle() {
    this.http
      .put('https://freeapi.gerasim.in/api/CarRentalApp/UpdateCar', this.updateVehicleObj)
      .subscribe({
        next: () => {
          alert('Successfully edited vehicle.');
          this.router.navigateByUrl('vehicles');
        },
        error: (error) => {
          alert('Error:' + error);
        },
      });
  }

  onCancel() {
    this.updateVehicleObj = new Vehicle();
    this.router.navigateByUrl('vehicles');
  }
}
