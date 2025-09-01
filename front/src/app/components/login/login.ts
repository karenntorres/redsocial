import { Component, inject } from '@angular/core';
import { Credentials } from '../../interfaces/credentials';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login-service';
import { Router, RouterLink } from '@angular/router';
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

  credentialForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  handleSubmit() {
    if (this.credentialForm.valid) {
      const email = this.credentialForm.value.email;
      const password = this.credentialForm.value.password;

      if (typeof email === 'string' && typeof password === 'string') {
        const credentials: Credentials = { email, password };

        this.loginService.login(credentials).subscribe(
          (response: any) => {
            if (response.result === 'fine') {
              // ✅ Save the JWT token correctly
              localStorage.setItem('token', response.data.token);

              // (Optional) Save user info if you want to display it later
              localStorage.setItem('user', JSON.stringify(response.data.user));

              // Redirect to posts page
              this.router.navigateByUrl('/posts');
            } else {
              console.error('Error, try again');
              this.router.navigateByUrl('/login');
            }
          },
          (error) => {
            console.error('Login request failed:', error);
          }
        );
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  goToForgotPassword() {
    this.router.navigateByUrl('/forgot-password');
  }
}
