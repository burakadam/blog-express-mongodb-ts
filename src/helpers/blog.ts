import { BlogModel } from '@/models/Blog';

const _getBlogList = () => BlogModel.find();

// const _createBlog = (
// values: BlogM
// ) => new BlogModel().save();

export { _getBlogList };
