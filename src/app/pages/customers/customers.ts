import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-customers',
  styleUrl: './customers.css',
  templateUrl: './customers.html',
})
export class Customers implements OnInit {
  http = inject(HttpClient);
  customers = signal<any>([]);
  editingId: number | null = null;
  draft: any = null;

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

  onEdit(customer: any) {
    this.editingId = customer.customerId;
    this.draft = structuredClone(customer);
  }

  onDelete(customer: any) {
    const wantsToDelete = confirm('Are you sure you want to delete this customer?');
    if (wantsToDelete) {
      this.http
        .delete(
          `https://freeapi.gerasim.in/api/CarRentalApp/DeletCustomerById?id=${customer.customerId}`,
        )
        .subscribe({
          next: () => {},
          error: (error) => {
            alert('Error: ' + error);
          },
        });
    }
  }

  onSave() {
    this.http
      .put('https://freeapi.gerasim.in/api/CarRentalApp/UpdateCustomer', this.draft)
      .subscribe({
        next: () => {},
        error: (error) => {
          alert('Error: ' + error);
        },
      });
    this.editingId = null;
    this.draft = null;
  }

  onCancel() {
    this.editingId = null;
    this.draft = null;
  }
}
