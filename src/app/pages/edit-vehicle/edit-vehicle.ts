import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-edit-vehicle',
  styleUrl: './edit-vehicle.css',
  templateUrl: './edit-vehicle.html',
})
export class EditVehicle implements OnInit {
  updateVehicleObj = {
    carId: 0,
    brand: 'asdf',
    model: '',
    year: 0,
    color: '',
    dailyRate: 0,
    carImage: '',
    regNo: '',
  };
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
        const found = response.data.find((c: any) => c.carId === id);
        if (found) {
          this.updateVehicleObj = { ...found }; // copy for editing
          this.cdr.markForCheck();
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
    this.updateVehicleObj = {
      carId: 0,
      brand: 'asdf',
      model: '',
      year: 0,
      color: '',
      dailyRate: 0,
      carImage: '',
      regNo: '',
    };

    this.router.navigateByUrl('vehicles');
  }
}
