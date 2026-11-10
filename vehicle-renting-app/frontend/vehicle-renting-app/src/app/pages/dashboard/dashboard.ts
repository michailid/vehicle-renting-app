import { Component, inject, OnInit, signal } from '@angular/core';
import { APIResponse } from '../../model/api-response.model';
import { DashboardData } from '../../model/dashboard-data.model';
import { Master } from '../../services/master';

@Component({
  imports: [],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  masterService = inject(Master);
  dashboardData = signal<DashboardData>(new DashboardData());

  ngOnInit(): void {
    this.masterService.getDashboardData().subscribe({
      next: (response: APIResponse) => {
        if (response.result) {
          this.dashboardData.set(response.data[0]);
        } else {
          alert(response.message);
        }
      },
      error: (error: any) => {
        alert('Error: ' + error);
      },
    });
  }
}
