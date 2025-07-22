import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-glim',
  templateUrl: './main-glim.html',
  styleUrl: './main-glim.css'
})
export class MainGlim {
  constructor(private router: Router) {}

  onSignUpClick() {
    this.router.navigate(['/register']);
  }

  onLoginClick() {
    this.router.navigate(['/login']);
  }
}