import Joi from 'joi';

const userIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const nameSchema = Joi.string().min(3).max(50);
const emailSchema = Joi.string().email();

export const getUserSchema = Joi.object({
  userId: userIdSchema
});

export const createUserSchema = Joi.object({
  name: nameSchema.required(),
  email: emailSchema.required()
});

export const updateUserSchema = Joi.object({
  name: nameSchema,
  email: emailSchema
});
