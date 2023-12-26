import { CategoryModel, ICategory } from '@/models/Category';

const _getCategoryList = () => CategoryModel.find();

const _createCategory = ({ name, description }: ICategory) =>
  new CategoryModel({ name, description }).save();

const _updateCategoryById = (id: string, values: ICategory) =>
  CategoryModel.findByIdAndUpdate(id, values);

const _findCategoryById = (_id: string) => CategoryModel.findById(_id);

export {
  _createCategory,
  _findCategoryById,
  _getCategoryList,
  _updateCategoryById,
};
