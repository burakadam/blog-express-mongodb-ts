import { CategoryModel } from 'models/Category';

const _createCategory = (name: string, description: string) =>
  new CategoryModel({ name, description }).save();

const _getCategories = () => CategoryModel.find();

export { _createCategory, _getCategories };
