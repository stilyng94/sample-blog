import { CommentModel } from './comment.model';

export interface PostModel {
  _id?: string;
  title?: string;
  content?: string;
  creator?: string;
  creatorName?: string;
  imagePath?: string;
  comments?: CommentModel[];
  createdAt?: Date;
}
