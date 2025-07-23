import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../interfaces/api-response";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private API_URL = 'http://localhost:3001/users';

constructor (private httpClient: HttpClient) {}

createUser(name: string, email: string, password: string, username: string, pfPicture: string):Observable<ApiResponse>{
  return this.httpClient.post<ApiResponse>(this.API_URL, {name, email, password, username, pfPicture});
}

}