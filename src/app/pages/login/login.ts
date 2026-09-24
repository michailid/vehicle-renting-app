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
  email: string = '';
  mobileNo: string = '';
  logggedInUser = {};
  customersData: any[] = [];

  http = inject(HttpClient);
  router = inject(Router);

  onLogin() {
    this.getAllCustomers();
    this.logggedInUser = this.customersData.find(
      (c) => c.email == this.email && c.mobileNo == this.mobileNo,
    );

    if (this.logggedInUser) {
      localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(this.logggedInUser));
      console.log('Logged in successfully');
      this.router.navigateByUrl('dashboard');
    } else {
      console.log('Wrong credentials');
    }
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
