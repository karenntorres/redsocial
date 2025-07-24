// src/app/services/login-service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../interfaces/credentials';
import  jwt_decode  from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  httpClient = inject(HttpClient);

  login(credentials: Credentials) {
    return this.httpClient.post('http://localhost:3001/loginUser', credentials);
  }

  decodeToken(token: string): any {
    return jwt_decode(token);
  }
}
