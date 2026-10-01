import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  http = inject(HttpClient);
  dashboardData = signal<any>({});

  ngOnInit(): void {
    this.http.get('https://freeapi.gerasim.in/api/CarRentalApp/GetDashboardData').subscribe({
      next: (response: any) => {
        this.dashboardData.set(response.data[0]);
      },
      error: (error) => {
        alert('Error: ' + error);
      },
    });
  }
}
