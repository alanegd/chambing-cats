import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SocialNetworkModule } from './social-network/social-network.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { SummarizationModule } from './summarization/summarization.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI ?? ''),
    SocialNetworkModule,
    PostModule,
    CommentModule,
    AnalyticsModule,
    SummarizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
