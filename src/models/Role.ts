import { MODELS } from '@/constants/models';
import mongoose, { Document, Schema } from 'mongoose';

export interface IRole extends Document {
  name: string;
  permissions: string[];
}

const RoleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: String, required: true }],
});

const RoleModel = mongoose.model<IRole>(MODELS.ROLE, RoleSchema);

export { RoleModel };
