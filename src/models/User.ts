import { MODELS } from '@/constants/models';
import moment from 'moment-timezone';
import mongoose, { Document, Schema, UpdateQuery } from 'mongoose';
import { IRole, RoleModel } from './Role';

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
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  role: { type: Schema.Types.ObjectId, ref: RoleModel },
});

UserSchema.pre('save', function (next) {
  if (!this.createdAt) this.createdAt = moment().toDate();
  next();
});

interface CustomUpdateQuery extends UpdateQuery<IUser> {
  updatedAt?: Date;
}

UserSchema.pre<CustomUpdateQuery>('findOneAndUpdate', function (next) {
  const updateFields: CustomUpdateQuery = this.getUpdate();
  updateFields.updatedAt = moment().toDate();
  next();
});

const UserModel = mongoose.model<IUser>(MODELS.USER, UserSchema);

export { UserModel };
