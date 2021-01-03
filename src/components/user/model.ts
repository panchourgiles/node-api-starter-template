import { Document, Model, model, Schema } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
}

interface UserDocument extends User, Document {}

const UserSchema = new Schema(
  {
    name: String,
    email: String
  },
  {
    strict: true,
    versionKey: false,
    timestamps: {
      createdAt: 'meta.createdAt',
      updatedAt: 'meta.updatedAt'
    }
  }
);

const UserModel: Model<UserDocument> = model<UserDocument>('User', UserSchema);
export default UserModel;
