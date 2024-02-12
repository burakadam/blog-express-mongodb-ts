import { CategoryModel } from '@/models/Category';

const _getCategoryList = () => CategoryModel.find();

const _createCategory = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => new CategoryModel({ name, description }).save();

const _updateCategoryById = (
  id: string,
  values: {
    name: string;
    description: string;
  }
) => CategoryModel.findByIdAndUpdate(id, values);

const _findCategoryById = (_id: string) => CategoryModel.findById(_id);

export {
  _createCategory,
  _findCategoryById,
  _getCategoryList,
  _updateCategoryById,
};
