import { CategoryModel } from '@/models/Category';

const _createCategory = (name: string, description: string) =>
  new CategoryModel({ name, description }).save();

const _getCategories = () => CategoryModel.find();

const _updateCategoryById = (id: string, values: Record<string, any>) =>
  CategoryModel.findByIdAndUpdate(id, values);

export { _createCategory, _getCategories, _updateCategoryById };
