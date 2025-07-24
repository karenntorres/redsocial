import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../services/register-service';
import { ApiResponse } from '../../interfaces/api-response';


@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
    name= '';
    email= '';
    password= '';
    username= '';
    pfPicture= '';
 

  constructor(private registerService: RegisterService, private router: Router) {}
  handleSubmit(): void {
    if(!this.name || !this.email || !this.password || !this.username || !this.pfPicture){
      alert('Please complete every field');
      return;
    }

    this.registerService.createUser(this.name, this.email, this.password, this.username, this.pfPicture).subscribe({
      next: (res: ApiResponse)=>{
        if(res.result === 'All Fine'){
          alert('User has been sucessfully registered');
          this.router.navigate(['/login']);
        }else{
          alert(res.message || 'User could not be found'); 
        }
      },

      error: (err)=>{
        console.log('Error in the server', err);
        alert('Unexpected error, try again');
      }

    });
  }

    onFileSelected(event: Event): void {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.pfPicture = reader.result as string;
      };
      reader.readAsDataURL(file);
      }
    } 
}
