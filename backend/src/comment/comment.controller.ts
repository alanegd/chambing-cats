import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './schemas/comment.schema';
import { Inject } from '@nestjs/common';
import { SummarizationService } from '../summarization/summarization.service';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    @Inject(SummarizationService) private readonly summarizationService: SummarizationService,
  ) {}

  @Get('post/:postId')
  async findAllByPost(@Param('postId') postId: string): Promise<Comment[]> {
    return this.commentService.findAllByPost(postId);
  }

  @Get('post/:postId/summary')
  async summarizeComments(@Param('postId') postId: string): Promise<{ summary: string }> {
    const messages = await this.commentService.getMessagesByPost(postId);
    const summary = await this.summarizationService.summarize(messages);
    return { summary };
  }
} 