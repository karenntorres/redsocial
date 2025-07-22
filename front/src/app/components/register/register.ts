import { Component } from '@angular/core';
import { RegisterService } from '../../services/register-service';
import { Users } from '../../interfaces/registerUsers';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  newUser: Users = {
    name: '',
    email: '',
    password: '',
    username: '',
    pfPicture: ''
  };

  message = '';
  imagePreview: string = '';

  constructor(private registerService: RegisterService) {}

  register() {
    this.registerService.createUser(this.newUser).subscribe({
      next: res => this.message = 'All Fine',
      error: err => {
        this.message = 'Error while registering the user!';
        console.error(err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;
        this.newUser.pfPicture = base64;
        this.imagePreview = base64;
        console.log('codified image:', base64);
      };

      reader.readAsDataURL(file);
    }
  }
}
