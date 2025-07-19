import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SocialNetwork, SocialNetworkDocument } from './schemas/social-network.schema';

@Injectable()
export class SocialNetworkService {
  constructor(
    @InjectModel(SocialNetwork.name) private socialNetworkModel: Model<SocialNetworkDocument>,
  ) {}

  async findAll(): Promise<SocialNetwork[]> {
    return this.socialNetworkModel.find().exec();
  }

  async findById(id: string): Promise<SocialNetwork | null> {
    return this.socialNetworkModel.findById(id).exec();
  }
} 