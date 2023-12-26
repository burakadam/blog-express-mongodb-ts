import mongoose, { Document, Schema } from 'mongoose';

export interface IPermission {
  route: string;
  name: string;
  description: string;
}

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

const PermissionModel = mongoose.model<IPermission & Document>(
  'Permission',
  PermissionSchema
);

export { PermissionModel };
