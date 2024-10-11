import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service'; // Assuming AuthService is properly created
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  loginForm!: FormGroup;
  submitted = false;
  authSubscription!: Subscription;
  errorMessage: string | null = null;  // To store error messages

  constructor(private authService: AuthService, private formBuilder: FormBuilder, 
    private router: Router,private snackBar: MatSnackBar) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // Helper methods to access form controls
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.errorMessage = null;
    const { email, password } = this.loginForm.value;

    // Call auth service to login
    this.authSubscription = this.authService.login(email, password).subscribe(
      (response: any) => {
        console.log(response);
        // Handle login success: Store token and redirect
        console.log(response,"Response")
        localStorage.setItem('token', response.access_token);  // Storing JWT token
        this.snackBar.open('Login Sucessful', 'Close', {
          duration: 3000, 
          verticalPosition: 'bottom', 
          horizontalPosition: 'center',
      });
        this.router.navigate(['/contactapp/dashboard']);  // Redirect to dashboard
      },
      (error: any) => {
        console.error(error);
        this.snackBar.open('Error Occured', 'Close', {
          duration: 3000, // Show for 3 seconds
          verticalPosition: 'bottom', // 'top' or 'bottom'
          horizontalPosition: 'center', // 'start', 'center', 'end', 'left', or 'right'
      });
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    );
  }

  goToRegister() {
    this.router.navigate(['contactapp/register']); // Adjust the route to your registration component
  }

  // Cleaning up
  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
