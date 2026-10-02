import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-customers',
  styleUrl: './customers.css',
  templateUrl: './customers.html',
})
export class Customers implements OnInit {
  http = inject(HttpClient);
  customers = signal<any>([]);

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.http.get('https://freeapi.gerasim.in/api/CarRentalApp/GetCustomers').subscribe({
      next: (response: any) => {
        this.customers.set(response.data);
      },
      error: (error) => {
        alert('Error loading customers: ' + error);
      },
    });
  }
}
