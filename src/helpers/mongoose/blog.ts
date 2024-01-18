import { BlogModel, IBlog } from '@/models/Blog';

// ADD TOTAL COUNT
const _getBlogList = (page: number, pageSize: number) =>
  BlogModel.find({})
    .select('_id title viewCount createdAt updatedAt category')
    .populate('category', 'name')
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

const _createBlog = (params: IBlog) => new BlogModel(params).save();

export { _createBlog, _getBlogList };
