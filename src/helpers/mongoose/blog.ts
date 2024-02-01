import { BlogModel, IBlog } from '@/models/Blog';

// ADD TOTAL COUNT
// CHECK ONLY GET CATEGORY NAME NOT AN OBJECT
const _getBlogList = (page: number, pageSize: number) =>
  BlogModel.find({})
    .select('_id title viewCount createdAt updatedAt')
    .populate('category', 'name')
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

const _createBlog = (params: IBlog) => new BlogModel(params).save();

const _findBlogById = (_id: string) => BlogModel.findById(_id);

const _updateBlogById = (id: string, params: IBlog) =>
  BlogModel.findByIdAndUpdate(id, params);

export { _createBlog, _findBlogById, _getBlogList, _updateBlogById };
