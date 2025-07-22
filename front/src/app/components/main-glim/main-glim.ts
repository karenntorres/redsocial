import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-glim',
  standalone: true,
  templateUrl: './main-glim.html',
  styleUrls: ['./main-glim.css']
})
export class MainGlim {
  constructor(private router: Router) {}

  onSignUpClick() {
    console.log('CLICK EN SIGN UP');
    this.router.navigate(['/register']);
  }

  onLoginClick() {
    this.router.navigate(['/login']);
  }
}
