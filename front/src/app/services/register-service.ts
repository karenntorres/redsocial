import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../interfaces/registerUsers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  private API_URL = 'http://localhost:3001/users';

  constructor(private http: HttpClient) {}

 // to create: 

 createUser(user: Users): Observable<Users>{
  return this.http.post<Users>(this.API_URL, user)
 }

 // to read all users:
 getUsers(): Observable<Users[]>{
  return this.http.get<Users[]>(this.API_URL);
 }

 // to read one by ID
 getUserById(id: string): Observable<Users>{
return this.http.get<Users>(`${this.API_URL}/${id}`); 
}

// to update 
updateUser(id: string, user: Users): Observable<Users>{
  return this.http.put<Users>(`${this.API_URL}/${id}`, user);
}

// to delete
deleteUser(id: string): Observable<any>{
  return this.http.delete<Users>(`${this.API_URL}/${id}`);
}

}
