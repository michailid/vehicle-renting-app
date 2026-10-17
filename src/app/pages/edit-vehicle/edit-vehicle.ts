import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from '../../model/vehicle.model';
import { APIResponse } from '../../model/api-response.model';
import { Master } from '../../services/master';

@Component({
  imports: [FormsModule],
  selector: 'app-edit-vehicle',
  styleUrl: './edit-vehicle.css',
  templateUrl: './edit-vehicle.html',
})
export class EditVehicle implements OnInit {
  updateVehicleObj = new Vehicle();
  router = inject(Router);
  masterService = inject(Master);
  cdr = inject(ChangeDetectorRef);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // get the list of all cars and find the current car
    this.masterService.getAllVehicles().subscribe({
      next: (response: APIResponse) => {
        if (response.result) {
          const found = response.data.find((c: Vehicle) => c.carId === id);
          if (found) {
            this.updateVehicleObj = { ...found }; // copy for editing
            this.cdr.markForCheck(); // refresh the UI
          } else {
            this.router.navigate(['/vehicles']);
            alert('Vehicle not found.');
          }
        } else {
          alert(response.message);
        }
      },
      error: (error: any) => {
        alert('Error: ' + error);
      },
    });
  }

  onUpdateVehicle() {
    this.masterService.updateVehicle(this.updateVehicleObj).subscribe({
        next: (response: APIResponse) => {
          if (response.result) {
            alert('Successfully edited vehicle.');
            this.router.navigateByUrl('vehicles');
          } else {
            alert(response.message);
          }
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
