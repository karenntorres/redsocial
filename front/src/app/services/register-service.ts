import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private API_URL = `${environment.apiUrl}/users`;

  constructor(private httpClient: HttpClient) {}

  createUser(
    name: string,
    email: string,
    password: string,
    username: string,
    pfPicture: File | null // 👈 File, not string
  ): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('username', username);

    if (pfPicture) {
      formData.append('pfPicture', pfPicture); // 👈 must match backend field name
    }

    return this.httpClient.post<ApiResponse>(this.API_URL, formData);
  }
}
