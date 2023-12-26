import { MODELS } from '@/constants/models';
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
  MODELS.PERMISSION,
  PermissionSchema
);

export { PermissionModel };
