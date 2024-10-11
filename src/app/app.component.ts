import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  showNavbar = true;

  constructor(private router: Router) {
    // Subscribe to route changes
    this.router.events.subscribe(() => {
      // Check if the current route is 'login'
      console.log(this.router.url,"URL")
      if (this.router.url === '/contactapp/login' || this.router.url === '/contactapp/register') {
        this.showNavbar = false; // Hide the navbar on the login page
      } else {
        this.showNavbar = true;  // Show the navbar on other pages
      }
    });
  }
}
