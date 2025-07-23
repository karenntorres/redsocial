import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Navigation } from '../navigation/navigation';
import { Posts as PostModel } from '../../interfaces/posts';
import { PostService } from '../../services/posts-service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, FormsModule, Navigation, RouterOutlet],
  templateUrl: './posts.html',
  styleUrls: ['./posts.css']
})
export class Posts implements OnInit {
  nuevaPublicacion: string = '';
  imagenSeleccionada: File | null = null;
  posts: PostModel[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: (data: PostModel[]) => {
        this.posts = data;
      },
      error: (err: unknown) => {
        console.error('Error al cargar posts:', err);
      }
    });
  }

  onImageSelected(event: any): void {
    const archivo = event.target.files[0];
    this.imagenSeleccionada = archivo ? archivo : null;
  }

  publicar(): void {
    if (!this.nuevaPublicacion.trim()) return;

    const formData = new FormData();
    formData.append('contenido', this.nuevaPublicacion.trim());

    if (this.imagenSeleccionada) {
      formData.append('imagen', this.imagenSeleccionada);
    }

    this.postService.createPost(formData).subscribe({
      next: (respuesta: PostModel) => {
        this.posts = [respuesta, ...this.posts];
        this.nuevaPublicacion = '';
        this.imagenSeleccionada = null;
      },
      error: (err: unknown) => {
        console.error('Error al crear el post:', err);
      }
    });
  }

  trackByPostId(index: number): number {
    return index;
  }
}