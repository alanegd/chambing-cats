import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SocialNetwork, SocialNetworkSchema } from './schemas/social-network.schema';
import { SocialNetworkService } from './social-network.service';
import { SocialNetworkController } from './social-network.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: SocialNetwork.name, schema: SocialNetworkSchema }])],
  controllers: [SocialNetworkController],
  providers: [SocialNetworkService],
  exports: [SocialNetworkService],
})
export class SocialNetworkModule {} 