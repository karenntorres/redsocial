import {
  Component,
  OnInit,
  inject,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import jwt_decode from 'jwt-decode';

import { StorageService } from '../../services/storage.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  imports: [CommonModule],
})
export class Profile implements OnInit {
  router = inject(Router);
  storage = inject(StorageService);
  http = inject(HttpClient);
  zone = inject(NgZone);
  cdr = inject(ChangeDetectorRef);
  sanitizer = inject(DomSanitizer);

  user: any = null;
  safePicture: SafeUrl | null = null;

  ngOnInit() {
    const token = this.storage.getToken();
    if (!token) {
      this.router.navigateByUrl('/login');
      return;
    }

    let decoded: any;
    try {
      decoded = jwt_decode(token);
      console.log('✅ Decoded token:', decoded);
    } catch (e) {
      console.error('❌ Token invalid:', e);
      this.storage.clear();
      this.router.navigateByUrl('/login');
      return;
    }

    this.http
      .get(`${environment.apiUrl}/users/${decoded.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: (res: any) => {
          console.log(' Raw response from backend:', res);

          const u = res?.data ?? res;

          this.zone.run(() => {
            this.user = u;
            this.safePicture = u?.pfPicture
              ? this.sanitizer.bypassSecurityTrustUrl(u.pfPicture)
              : null;
            console.log('✅ Final user object set:', this.user);
            this.cdr.detectChanges();
          });
        },
        error: (err) => {
          console.error('❌ Failed to fetch user info:', err);
          this.storage.clear();
          this.router.navigateByUrl('/login');
        },
      });
  }
}
