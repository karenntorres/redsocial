import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';
  message = '';

  constructor(private router: Router) {}

  login() {
    // Aquí podrías hacer tu lógica real de login
    if (this.email && this.password) {
      // Simula éxito
      this.message = 'Login successful!';
      // Navegar a main (opcional)
      this.router.navigate(['/main']);
    } else {
      this.message = 'Please enter email and password.';
    }
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
