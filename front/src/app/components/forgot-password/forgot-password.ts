import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css'],
})
export class ForgotPassword {
  recoverForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  message: string = '';

  constructor(private httpClient: HttpClient) {}

  handleRecover() {
    if (this.recoverForm.valid) {
      const email = this.recoverForm.value.email;
      this.httpClient

        .post<any>(`${environment.apiUrl}/users/forgot-password`, { email })
        .subscribe({
          next: (res) => {
            this.message = res.message;
          },
          error: (err) => {
            if (err.status === 404) {
              this.message = 'Email address not found.';
            } else {
              this.message = 'An error occurred while sending the email.';
            }
            console.error(err);
          },
        });
    }
  }
}
