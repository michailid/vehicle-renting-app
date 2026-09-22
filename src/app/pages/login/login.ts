import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  email: string = '';
  mobileNo: string = '';

  onLogin() {
    if (this.email === 'asdf@gmail.com' && this.mobileNo === '1234567890') {
      console.log('Logged in successfully');
    } else {
      console.log('Wrong credentials');
    }
  }
}
