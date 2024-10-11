import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  submitted = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, 
    private router: Router, private snackbar: MatSnackBar) 
  {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { 
      validators: this.mustMatch('password', 'confirmPassword') // Custom validator for password match
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  // Custom validator to check if passwords match
  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.controls[password];
      const confirmPassControl = formGroup.controls[confirmPassword];

      if (confirmPassControl.errors && !confirmPassControl.errors?.['mustMatch']) {
        return;
      }

      if (passControl.value !== confirmPassControl.value) {
        confirmPassControl.setErrors({ mustMatch: true });
      } else {
        confirmPassControl.setErrors(null);
      }
    };
  }


  // Handle form submission
  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const { email, password } = this.registerForm.value;

    // Call auth service to register
    this.authService.register(email, password).subscribe(
      (response: any) => {
        this.snackbar.open('Registration Sucessful', 'Close', {
          duration: 3000, 
          verticalPosition: 'bottom', 
          horizontalPosition: 'center',
      });
        this.router.navigate(['contactapp/login']);
      },
      (error: any) => {
        this.snackbar.open('Registration Unsucessful', 'Close', {
          duration: 3000, 
          verticalPosition: 'bottom', 
          horizontalPosition: 'center',
      });
      }
    );
  }
}
