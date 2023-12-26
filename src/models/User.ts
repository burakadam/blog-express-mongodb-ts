import { MODELS } from '@/constants/models';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  permissions: [string];
  fullName: string;
  profileImage: string;
  blogs: [string];
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  fullName: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: MODELS.BLOG,
    },
  ],
  isActive: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  permissions: [
    {
      type: String,
      ref: MODELS.PERMISSION,
    },
  ],
});

const UserModel = mongoose.model<IUser & Document>(MODELS.USER, UserSchema);

export { UserModel };
