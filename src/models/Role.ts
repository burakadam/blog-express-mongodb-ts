import mongoose, { Document, Schema } from 'mongoose';

export interface IRole extends Document {
  name: string;
  permissions: string[];
}

const RoleSchema = new Schema({
  name: { type: String, required: true },
  permissions: [{ type: String, required: true }], // Array of permission IDs
});

const RoleModel = mongoose.model<IRole>('Role', RoleSchema);

export { RoleModel };
