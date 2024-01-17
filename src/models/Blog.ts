import { MODELS } from '@/constants/models';
import moment from 'moment-timezone';
import mongoose, { Schema, UpdateQuery } from 'mongoose';
import { CategoryModel } from './Category';
import { UserModel } from './User';

export interface IBlog {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  tags: [string];
  category: string;
  viewCount: number;
  poster: string;
}

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
  updatedAt: {
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
  poster: {
    type: String,
    required: true,
  },
});

BlogSchema.pre('save', function (next) {
  if (!this.createdAt) this.createdAt = moment().toDate();
  next();
});

interface CustomUpdateQuery extends UpdateQuery<IBlog> {
  updatedAt?: Date;
}

BlogSchema.pre<CustomUpdateQuery>('findOneAndUpdate', function (next) {
  const updateFields: CustomUpdateQuery = this.getUpdate();
  updateFields.updatedAt = moment().toDate();
  next();
});

const BlogModel = mongoose.model<IBlog>(MODELS.BLOG, BlogSchema);

export { BlogModel };
