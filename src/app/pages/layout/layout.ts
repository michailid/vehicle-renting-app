import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LOGGED_USER_KEY } from '../../constants/constants';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {
  loggedInUser = signal(JSON.parse(localStorage.getItem(LOGGED_USER_KEY)!));

  onLogout() {
    localStorage.removeItem(LOGGED_USER_KEY);
  }
}
