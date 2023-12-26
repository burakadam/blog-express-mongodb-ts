import { MODELS } from '@/constants/models';
import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory {
  name: string;
  description: string;
}

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const CategoryModel = mongoose.model<ICategory & Document>(
  MODELS.CATEGORY,
  CategorySchema
);

export { CategoryModel };
