import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { Credentials } from '../../interfaces/credentials';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [ReactiveFormsModule, RouterLink, RouterModule],
})
export class Login {
  router = inject(Router);
  loginService: LoginService = inject(LoginService);

  message = 'Worn password or email, try again';

  credentialForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  handleSubmit() {
    if (this.credentialForm.valid) {
      const email = this.credentialForm.value.email!;
      const password = this.credentialForm.value.password!;

      const credentials: Credentials = { email, password };

      this.loginService.login(credentials).subscribe({
        next: (response: any) => {
          if (response.result === 'fine') {
            localStorage.setItem('token', response.data);

            const decoded: any = this.loginService.decodeToken(response.data);
            console.log('Decoded token:', decoded);

            if (decoded.rol === 'admin') {
              this.router.navigateByUrl('/posts');
            } else {
              this.router.navigateByUrl('/main-glim');
            }
          } else {
            this.message = 'Login failed: ' + response.message;
          }
        },
        error: (err) => {
          this.message = 'Login error. Please try again.';
        },
      });
    } else {
      this.message = 'Please fill in both fields.';
    }
  }

  goToForgotPassword() {
    this.router.navigateByUrl('/forgot-password');
  }
}
