import { MODELS } from '@/constants/models';
import mongoose, { Schema } from 'mongoose';
import { CategoryModel } from './Category';
import { UserModel } from './User';

// export interface IBlog {
//   title:string
//   content:string
//   author:
// }

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tags: [String],
  category: {
    type: Schema.Types.ObjectId,
    ref: CategoryModel,
    required: true,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
});

const BlogModel = mongoose.model(MODELS.BLOG, BlogSchema);

export { BlogModel };
