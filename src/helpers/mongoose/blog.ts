import { BlogModel, IBlog } from '@/models/Blog';

// ADD TOTAL COUNT
// CHECK ONLY GET CATEGORY NAME NOT AN OBJECT
const _getBlogList = async (
  page: number,
  pageSize: number,
  search: string | undefined
) => {
  const filter: any = {};

  if (search) {
    filter.name = { $regex: new RegExp(search, 'i') }; // Case-insensitive search
  }

  const totalBlogs = await BlogModel.countDocuments(filter);

  const blogList = await BlogModel.find(filter)
    .select('_id title viewCount createdAt updatedAt')
    .populate('category', 'name')
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  return {
    totalCount: totalBlogs,
    blogs: blogList,
  };
};

const _createBlog = (params: IBlog) => new BlogModel(params).save();

const _findBlogById = (_id: string) => BlogModel.findById(_id);

const _updateBlogById = (id: string, params: IBlog) =>
  BlogModel.findByIdAndUpdate(id, params);

const _deleteBlogById = (id: string) => BlogModel.findByIdAndDelete(id);

export {
  _createBlog,
  _deleteBlogById,
  _findBlogById,
  _getBlogList,
  _updateBlogById,
};
