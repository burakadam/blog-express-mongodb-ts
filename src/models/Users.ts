import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

const UserModel = mongoose.model('User', UserSchema);

export { UserModel };
