import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { APIResponse } from '../../model/api-response.model';
import { DashboardData } from '../../model/dashboard-data.model';

@Component({
  imports: [],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  http = inject(HttpClient);
  dashboardData = signal<DashboardData>(new DashboardData());

  ngOnInit(): void {
    this.http
      .get<APIResponse>('https://freeapi.gerasim.in/api/CarRentalApp/GetDashboardData')
      .subscribe({
        next: (response: APIResponse) => {
          this.dashboardData.set(response.data[0]);
        },
        error: (error: any) => {
          alert('Error: ' + error);
        },
      });
  }
}
