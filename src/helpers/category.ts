import { CategoryModel } from '@/models/Category';

const _createCategory = (name: string, description: string) =>
  new CategoryModel({ name, description }).save();

const _getCategories = () => CategoryModel.find();

const _updateCategoryById = (id: string, values: Record<string, any>) =>
  CategoryModel.findByIdAndUpdate(id, values);

const _findCategoryById = (_id: string) => CategoryModel.findById(_id);

export {
  _createCategory,
  _findCategoryById,
  _getCategories,
  _updateCategoryById,
};
