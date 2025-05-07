const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// Helper function for URL validation
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// 1. Validate clothing item creation
const validateClothingItem = celebrate({
  body: Joi.object({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    weather: Joi.string().required().messages({
      "string.empty": 'The "weather" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid url',
    }),
  }),
});

// 2. Validate user creation
const validateUserBody = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" field must be a valid url',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email address',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// 3. Validate user authentication (login)
const validateAuthentication = celebrate({
  body: Joi.object({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email address',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// 4. Validate ObjectId (for user and clothing item IDs)
const validateObjectId = celebrate({
  params: Joi.object({
    id: Joi.string().required().hex().length(24).messages({
      "string.empty": 'The "id" field must be filled in',
      "string.hex": 'The "id" field must be a hexadecimal value',
      "string.length": 'The "id" field must be exactly 24 characters long',
    }),
  }),
});

// Add this function after your other validation functions
const validateUserUpdate = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    avatar: Joi.string().custom(validateURL).messages({
      "string.uri": 'The "avatar" field must be a valid url',
    }),
  }),
});

module.exports = {
  validateClothingItem,
  validateUserBody,
  validateAuthentication,
  validateObjectId,
  validateUserUpdate,
};
