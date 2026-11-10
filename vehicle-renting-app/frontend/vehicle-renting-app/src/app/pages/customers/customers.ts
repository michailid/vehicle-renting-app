import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIResponse } from '../../model/api-response.model';
import { Customer } from '../../model/customer.model';
import { Master } from '../../services/master';

@Component({
  imports: [FormsModule],
  selector: 'app-customers',
  styleUrl: './customers.css',
  templateUrl: './customers.html',
})
export class Customers implements OnInit {
  masterService = inject(Master);
  customers = signal<Customer[]>([]);
  editingId: number | null = null;
  draft: Customer | null = null;

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.masterService.getAllCustomers().subscribe({
      next: (response: Customer[]) => {
        if (response) {
          this.customers.set(response);
        } else {
          alert(response);
        }
      },
      error: (error: Error) => {
        alert('Error loading customers: ' + error.message);
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
      this.masterService.deleteCustomer(customer.customerId).subscribe({
        next: (response: void) => {
          this.getAllCustomers();
          alert('Customer deleted successfully.');
        },
        error: (error: Error) => {
          alert('Error: ' + error.message);
        },
      });
    }
  }

  onSave() {
    this.masterService.updateCustomer(this.draft).subscribe({
      next: (response: Customer) => {
        if (!response) {
          alert(response);
        } else {
          this.getAllCustomers();
          alert('Customer updated successfully.');
        }
      },
      error: (error: Error) => {
        alert('Error: ' + error.message);
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
