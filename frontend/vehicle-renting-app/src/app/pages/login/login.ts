import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LOGGED_USER_KEY } from '../../constants/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { APIResponse } from '../../model/api-response.model';
import { Customer } from '../../model/customer.model';
import { Master } from '../../services/master';

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
  customersData: Customer[] = [];
  registerObj = new Customer();

  masterService = inject(Master);
  router = inject(Router);
  returnUrl: string = '/';

  constructor(private route: ActivatedRoute) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin() {
    this.getAllCustomers();
  }

  onRegister() {
    this.masterService.createNewCustomer(this.registerObj).subscribe({
        next: (response: APIResponse) => {
          if (!response.result) {
            alert(response.message);
          }
        },
        error: (error) => {
          alert('Error: ' + error);
        },
      });
  }

  getAllCustomers() {
    this.masterService.getAllCustomers().subscribe({
        next: (response: APIResponse) => {
          if (response.result) {
            this.logggedInUser = response.data.find(
              (c: Customer) =>
                c.email == this.loginObj.email && c.mobileNo == this.loginObj.mobileNo,
            );

            if (this.logggedInUser) {
              localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(this.logggedInUser));
              console.log('Logged in successfully');
              this.router.navigateByUrl(this.returnUrl);
            } else {
              alert('Wrong credentials');
            }

            this.customersData = response.data;
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
