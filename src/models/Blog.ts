import mongoose, { Schema } from 'mongoose';

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
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tags: [String],
  category: {
    type: String,
    trim: true,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
});

const BlogModel = mongoose.model('Blog', BlogSchema);

export { BlogModel };
