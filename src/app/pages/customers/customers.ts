import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIResponse } from '../../model/api-response.model';
import { Customer } from '../../model/customer.model';

@Component({
  imports: [FormsModule],
  selector: 'app-customers',
  styleUrl: './customers.css',
  templateUrl: './customers.html',
})
export class Customers implements OnInit {
  http = inject(HttpClient);
  customers = signal<Customer[]>([]);
  editingId: number | null = null;
  draft: Customer | null = null;

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.http
      .get<APIResponse>('https://freeapi.gerasim.in/api/CarRentalApp/GetCustomers')
      .subscribe({
        next: (response: APIResponse) => {
          this.customers.set(response.data);
        },
        error: (error: any) => {
          alert('Error loading customers: ' + error);
        },
      });
  }

  onEdit(customer: Customer) {
    this.editingId = customer.customerId;
    this.draft = structuredClone(customer);
  }

  onDelete(customer: Customer) {
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
