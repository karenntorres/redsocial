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
  cargando: boolean = false; // evita doble clic

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: (data: PostModel[]) => {
        this.posts = Array.isArray(data) ? data : [];
      },
      error: (err: unknown) => {
        console.error('Error al cargar posts:', err);
      }
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];
    this.imagenSeleccionada = archivo ?? null;
  }

  publicar(): void {
    if (this.cargando || !this.nuevaPublicacion.trim()) return;

    this.cargando = true;
    const formData = new FormData();
    formData.append('contenido', this.nuevaPublicacion.trim());

    if (this.imagenSeleccionada) {
      formData.append('imagen', this.imagenSeleccionada);
    }

    this.postService.createPost(formData).subscribe({
      next: (respuesta: any) => {
        const nuevoPost: PostModel = respuesta?.data;
        this.posts = [nuevoPost, ...this.posts];
        this.nuevaPublicacion = '';
        this.imagenSeleccionada = null;

        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        this.cargando = false;
      },
      error: (err: unknown) => {
        console.error('Error al crear el post:', err);
        this.cargando = false;
      }
    });
  }

  eliminar(post: PostModel): void {
    if (this.cargando || !post._id) return;

    this.cargando = true;
    this.postService.deletePost(post._id).subscribe({
      next: () => {
        this.posts = this.posts.filter(p => p._id !== post._id);
        this.cargando = false;
      },
      error: (err: unknown) => {
        console.error('Error al eliminar el post:', err);
        this.cargando = false;
      }
    });
  }

  trackByPostId(index: number, post: PostModel): string {
    return post._id;
  }
}