import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LOGGED_USER_KEY } from '../../constants/constants';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  loginObj = {
    email: '',
    mobileNo: '',
  };
  logggedInUser = {};
  customersData: any[] = [];
  registerObj = {
    CustomerId: 0,
    CustomerName: '',
    CustomerCity: '',
    MobileNo: '',
    Email: '',
  };

  http = inject(HttpClient);
  router = inject(Router);

  onLogin() {
    this.getAllCustomers();
    this.logggedInUser = this.customersData.find(
      (c) => c.email == this.loginObj.email && c.mobileNo == this.loginObj.mobileNo,
    );

    if (this.logggedInUser) {
      localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(this.logggedInUser));
      console.log('Logged in successfully');
      this.router.navigateByUrl('dashboard');
    } else {
      console.log('Wrong credentials');
    }
  }

  onRegister() {
    this.http
      .post('https://freeapi.gerasim.in/api/CarRentalApp/CreateNewCustomer', this.registerObj)
      .subscribe({
        next: () => {},
        error: () => {},
      });
  }

  getAllCustomers() {
    this.http.get('https://freeapi.gerasim.in/api/CarRentalApp/GetCustomers').subscribe({
      next: (response: any) => {
        this.customersData = response.data;
        console.log(response);
      },
      error: (error) => {
        alert('Error: ' + error);
      },
    });
  }
}
