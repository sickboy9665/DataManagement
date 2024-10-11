import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn = false;

  constructor(private snackbar: MatSnackBar) {
    // Assume you check if a user is logged in
    // This could be done by checking a token in localStorage/sessionStorage
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token'); // Clear auth token
    this.isLoggedIn = false;
    this.snackbar.open('Logout Sucessful', 'Close', {
      duration: 3000, 
      verticalPosition: 'bottom', 
      horizontalPosition: 'center',
  });
  }
}
