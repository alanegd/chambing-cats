import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { CommentService } from '../comment/comment.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private readonly commentService: CommentService,
  ) {}

  async findAllBySocialNetwork(socialNetworkId: string): Promise<Post[]> {
    return this.postModel.find({ socialNetwork: new Types.ObjectId(socialNetworkId) }).exec();
  }

  async findById(id: string): Promise<Post | null> {
    return this.postModel.findById(id).exec();
  }

  async getCommentMessages(postId: string): Promise<string[]> {
    return this.commentService.getMessagesByPost(postId);
  }
} 