import { model, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    }
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

UserSchema.index({ email: 1 }, { unique: true });

const userModel = model('User', UserSchema);
export default userModel;
