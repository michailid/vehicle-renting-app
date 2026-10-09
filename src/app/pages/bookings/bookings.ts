import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
@Component({
  imports: [DatePipe],
  selector: 'app-bookings',
  styleUrl: './bookings.css',
  templateUrl: './bookings.html',
})
export class Bookings implements OnInit {
  bookings = signal<any>([]);
  filteredBookings = signal<any>([]);
  http = inject(HttpClient);

  ngOnInit(): void {
    this.getAllBookings();
  }

  getAllBookings() {
    this.http.get('https://freeapi.gerasim.in/api/CarRentalApp/geAllBookings').subscribe({
      next: (response: any) => {
        this.bookings.set(response.data);
        this.filteredBookings.set(this.bookings());
      },
      error: (error) => {
        alert('Error: ' + error);
      },
    });
  }

  onSearch(from: string, to: string) {
    console.log('From: ' + from + '\nTo: ' + to);
    this.filteredBookings.set(this.bookings());
    this.filteredBookings.update((list) =>
      list.filter((item: any) => {
        const date = item.bookingDate.slice(0, 10);
        return (!from || date >= from) && (!to || date <= to);
      }),
    );
  }

  onClear() {
    this.filteredBookings.set(this.bookings());
  }

  onDelete(bookingId: number) {
    this.http
      .delete(`https://freeapi.gerasim.in/api/CarRentalApp/DeletBookingById?id=${bookingId}`)
      .subscribe({
        next: () => {
          alert('Successfully deleted booking.');
        },
        error: (error) => {
          alert('Error: ' + error);
        },
      });
  }
}
