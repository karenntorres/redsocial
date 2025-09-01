import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Posts } from '../interfaces/posts';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private API_URL = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) {}

  createPost(postData: FormData): Observable<Posts> {
    return this.http.post<Posts>(this.API_URL, postData);
  }

  getPosts(): Observable<Posts[]> {
    return this.http.get<Posts[]>(this.API_URL);
  }

  getPostById(id: string): Observable<Posts> {
    return this.http.get<Posts>(`${this.API_URL}/${id}`);
  }

  updatePost(id: string, post: Posts): Observable<Posts> {
    return this.http.put<Posts>(`${this.API_URL}/${id}`, post);
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
