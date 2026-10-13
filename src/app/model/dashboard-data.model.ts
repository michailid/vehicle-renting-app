export class DashboardData {
  totalCars: number;
  totalCustomers: number;
  totalBookings: number;
  todaysBooking: number;
  todayTotalAmount: number;
  totalAmount: number;

  constructor() {
    this.totalCars = 0;
    this.totalCustomers = 0;
    this.totalBookings = 0;
    this.todaysBooking = 0;
    this.todayTotalAmount = 0;
    this.totalAmount = 0;
  }
}
