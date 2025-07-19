import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async findAllByPost(postId: string): Promise<Comment[]> {
    return this.commentModel.find({ post: new Types.ObjectId(postId) }).exec();
  }

  async getMessagesByPost(postId: string): Promise<string[]> {
    const comments = await this.commentModel.find({ post: new Types.ObjectId(postId) }).exec();
    return comments.map(comment => comment.message);
  }
} 