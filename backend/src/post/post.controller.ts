import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from './schemas/post.schema';
import { GeminiService } from '../gemini/gemini.service';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly geminiService: GeminiService,
  ) {}

  @Get('social-network/:socialNetworkId')
  async findAllBySocialNetwork(
    @Param('socialNetworkId') socialNetworkId: string,
  ): Promise<Post[]> {
    return this.postService.findAllBySocialNetwork(socialNetworkId);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Post | null> {
    return this.postService.findById(id);
  }

  @Get(':id/comments/summary')
  async summarizeComments(
    @Param('id') postId: string,
  ): Promise<{ summary: string }> {
    const messages = await this.postService.getCommentMessages(postId);
    const summary = await this.geminiService.summarizeComments(messages);
    return { summary };
  }
}
