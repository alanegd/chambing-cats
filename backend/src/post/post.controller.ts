import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from './schemas/post.schema';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('social-network/:socialNetworkId')
  async findAllBySocialNetwork(@Param('socialNetworkId') socialNetworkId: string): Promise<Post[]> {
    return this.postService.findAllBySocialNetwork(socialNetworkId);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Post | null> {
    return this.postService.findById(id);
  }
} 