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
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterModule],
})
export class Login {
  router = inject(Router);
  loginService = inject(LoginService);

  credentialForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  handleSubmit() {
    if (this.credentialForm.valid) {
      const email = this.credentialForm.value.email!;
      const password = this.credentialForm.value.password!;

      const credentials: Credentials = { email, password };

      this.loginService.login(credentials).subscribe((response: any) => {
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
          alert('Login failed: ' + response.message);
        }
      });
    } else {
      alert('Please fill in both fields.');
    }
  }
}

// comentario prueba
