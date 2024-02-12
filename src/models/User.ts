import { MODELS } from '@/constants/models';
import mongoose, { Document, Schema } from 'mongoose';
import { IRole } from './Role';

export interface IUser extends Document {
  email: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  permissions: [string];
  fullName: string;
  profileImage: string;
  blogs: [string];
  role: IRole['_id'];
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
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
});

const UserModel = mongoose.model<IUser>(MODELS.USER, UserSchema);

export { UserModel };
