import type { CommentSentiment } from "./CommentSentiment";
import type { CommentUser } from "./CommentUser";

export interface Comment {
  id: string;
  text: string;

  user: CommentUser;

  publishedAt: string; // Añadido para mostrar fecha y hora
  likes: number;       // Añadido para poder ordenar por likes
  sentiment?: CommentSentiment; // El sentimiento es opcional al principio
}
