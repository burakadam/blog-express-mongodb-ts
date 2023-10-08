import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
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
