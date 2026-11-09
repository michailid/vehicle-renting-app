import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { APIResponse } from '../../model/api-response.model';
import { Booking } from '../../model/booking.model';
import { Master } from '../../services/master';
@Component({
  imports: [DatePipe],
  selector: 'app-bookings',
  styleUrl: './bookings.css',
  templateUrl: './bookings.html',
})
export class Bookings implements OnInit {
  bookings = signal<Booking[]>([]);
  filteredBookings = signal<Booking[]>([]);
  masterService = inject(Master);

  ngOnInit(): void {
    this.getAllBookings();
  }

  getAllBookings() {
    this.masterService.getAllBookings().subscribe({
      next: (response: APIResponse) => {
        if (response.result) {
          this.bookings.set(response.data);
          this.filteredBookings.set(this.bookings());
        } else {
          alert(response.message);
        }
      },
      error: (error: any) => {
        alert('Error: ' + error);
      },
    });
  }

  onSearch(from: string, to: string) {
    console.log('From: ' + from + '\nTo: ' + to);
    this.filteredBookings.set(this.bookings());
    this.filteredBookings.update((list) =>
      list.filter((item: Booking) => {
        const date = item.bookingDate.slice(0, 10);
        return (!from || date >= from) && (!to || date <= to);
      }),
    );
  }

  onClear() {
    this.filteredBookings.set(this.bookings());
  }

  onDelete(bookingId: number) {
    this.masterService.deleteBooking(bookingId).subscribe({
      next: (response: APIResponse) => {
        if (response.result) {
          this.getAllBookings();
          alert('Successfully deleted booking.');
        } else {
          alert(response.message);
        }
      },
      error: (error) => {
        alert('Error: ' + error);
      },
    });
  }
}
