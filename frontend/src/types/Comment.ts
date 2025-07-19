import type { CommentUser } from "./CommentUser";

export interface Comment {
  id: string;
  text: string;

  user: CommentUser;
}
