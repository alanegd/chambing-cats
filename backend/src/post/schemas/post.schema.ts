import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  content: string;

  @Prop()
  image?: string;

  @Prop()
  thumbnail?: string;

  @Prop({ default: 0 })
  reactions: number;

  @Prop({ default: 0 })
  comments: number;

  @Prop({ type: Types.ObjectId, ref: 'SocialNetwork', required: true })
  socialNetwork: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post); 