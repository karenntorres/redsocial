import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPassword {
  email: string = '';
  message: string = '';

  onSubmit() {
    if (!this.email) {
      this.message = 'Please enter a valid email.';
      return;
    }

    // Aquí podrías hacer una llamada a tu servicio en el futuro
    // Por ahora solo muestra el mensaje de éxito simulado
    this.message = `A reset link has been sent to ${this.email}.`;
  }
}
