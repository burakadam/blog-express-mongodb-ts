import { BlogModel, IBlog } from '@/models/Blog';

const _getBlogList = () => BlogModel.find();

const _createBlog = (params: IBlog) => new BlogModel(params).save();

export { _createBlog, _getBlogList };
