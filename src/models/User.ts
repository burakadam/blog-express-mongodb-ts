import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  permissions: [string];
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
      ref: 'Permission',
    },
  ],
});

const UserModel = mongoose.model<IUser & Document>('User', UserSchema);

export { UserModel };
