import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Post {
  id: number;
  usuario: string;
  contenido: string;
  comentarios: string[];
  nuevosComentarios: string[];
}

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './posts.html',
  styleUrl: './posts.css'
})
export class Posts {
  nuevaPublicacion: string = '';
  private contadorId = 1;

  posts: Post[] = [];

  publicar() {
    const contenido = this.nuevaPublicacion.trim();
    if (contenido) {
      const nuevoPost: Post = {
        id: this.contadorId++,
        usuario: 'Usuario Actual',
        contenido,
        comentarios: [],
        nuevosComentarios: ['']
      };
      this.posts = [nuevoPost, ...this.posts]; // ← Esto evita redibujar por referencia
      this.nuevaPublicacion = '';
    }
  }

  agregarCampoComentario(post: Post) {
    post.nuevosComentarios = [...post.nuevosComentarios, '']; // fuerza el cambio por referencia
  }

  comentar(post: Post, index: number) {
    const texto = post.nuevosComentarios[index]?.trim();
    if (texto) {
      post.comentarios = [...post.comentarios, texto];
      post.nuevosComentarios[index] = '';
    }
  }

  agregarCampoComentarioAlPublicar() {
    // Lógica opcional si quieres hacer algo similar al publicar
  }

  trackByPostId(index: number, post: Post) {
    return post.id;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
