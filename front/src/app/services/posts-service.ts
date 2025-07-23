import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Posts } from '../interfaces/posts'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private API_URL = 'http://localhost:3001/posts';

  constructor(private http: HttpClient) {}

  // Crear nuevo post
  createPost(postData: FormData): Observable<Posts> {
  return this.http.post<Posts>(this.API_URL, postData);
}

  // Obtener todos los posts
  getPosts(): Observable<Posts[]> {
    return this.http.get<Posts[]>(this.API_URL);
  }

  // Obtener un post por ID
  getPostById(id: string): Observable<Posts> {
    return this.http.get<Posts>(`${this.API_URL}/${id}`);
  }

  // Actualizar un post
  updatePost(id: string, post: Posts): Observable<Posts> {
    return this.http.put<Posts>(`${this.API_URL}/${id}`, post);
  }

  // Eliminar un post
  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}