export class Booking {
  customerName: string;
  customerCity: string;
  mobileNo: string;
  email: string;
  bookingId: number;
  carId: number;
  bookingDate: string;
  discount: number;
  totalBillAmount: number;

  constructor() {
    this.customerName = '';
    this.customerCity = '';
    this.mobileNo = '';
    this.email = '';
    this.bookingId = 0;
    this.carId = 0;
    this.bookingDate = '';
    this.discount = 0;
    this.totalBillAmount = 0;
  }
}
