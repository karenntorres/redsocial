import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navigation } from '../navigation/navigation';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, Navigation],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css'],
})
export class Settings {}
