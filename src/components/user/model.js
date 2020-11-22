import { model, Schema } from 'mongoose';

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

const userModel = model('User', UserSchema);
export default userModel;
