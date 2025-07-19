import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SocialNetworkDocument = SocialNetwork & Document;

export enum SocialNetworkType {
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
  TIKTOK = 'tiktok',
  LINKEDIN = 'linkedin',
}

@Schema({ timestamps: true })
export class SocialNetwork {
  @Prop({ required: true, enum: SocialNetworkType })
  type: SocialNetworkType;

  @Prop({ required: true })
  icon: string;

  @Prop({ required: true })
  url: string;

  @Prop({ default: 0 })
  followers: number;
}

export const SocialNetworkSchema = SchemaFactory.createForClass(SocialNetwork); 