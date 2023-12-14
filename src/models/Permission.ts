import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
  route: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const PermissionModel = mongoose.model('Permission', PermissionSchema);

export { PermissionModel };
