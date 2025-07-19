import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SocialNetwork, SocialNetworkDocument } from '../social-network/schemas/social-network.schema';
import { Post, PostDocument } from '../post/schemas/post.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(SocialNetwork.name) private socialNetworkModel: Model<SocialNetworkDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}

  async getSocialNetworkStats(socialNetworkId: string) {
    const posts = await this.postModel.find({ socialNetwork: socialNetworkId });
    const reactions = posts.reduce((sum, post) => sum + (post.reactions || 0), 0);
    const comments = posts.reduce((sum, post) => sum + (post.comments || 0), 0);
    // Followers assumed as a field in SocialNetwork
    const socialNetwork = await this.socialNetworkModel.findById(socialNetworkId);
    const followers = socialNetwork?.followers || 0;
    return { reactions, comments, followers };
  }

  async getTotalStats() {
    const posts = await this.postModel.find();
    const reactions = posts.reduce((sum, post) => sum + (post.reactions || 0), 0);
    const comments = posts.reduce((sum, post) => sum + (post.comments || 0), 0);
    const socialNetworks = await this.socialNetworkModel.find();
    const followers = socialNetworks.reduce((sum, sn) => sum + (sn.followers || 0), 0);
    return { reactions, comments, followers };
  }
} 