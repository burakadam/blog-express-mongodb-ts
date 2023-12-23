import { CategoryModel } from '@/models/Category';

const _createCategory = (name: string, description: string) =>
  new CategoryModel({ name, description }).save();

const _getCategories = () => CategoryModel.find();

const _updateCategoryById = (id: string, values: Record<string, any>) =>
  CategoryModel.findByIdAndUpdate(id, values);

const _findCategoryById = (id: string) => CategoryModel.findById(id);

export {
  _createCategory,
  _findCategoryById,
  _getCategories,
  _updateCategoryById,
};
