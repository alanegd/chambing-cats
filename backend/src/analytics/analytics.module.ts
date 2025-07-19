import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SocialNetwork, SocialNetworkSchema } from '../social-network/schemas/social-network.schema';
import { Post, PostSchema } from '../post/schemas/post.schema';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SocialNetwork.name, schema: SocialNetworkSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {} 