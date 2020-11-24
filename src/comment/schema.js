const Joi = require('joi');
const {
  Types: { ObjectId },
} = require('mongoose');

exports.commentRulesSchema = Joi.object({
  name: Joi.string().required().min(2).max(50),
  text: Joi.string().required().min(10),
});

exports.rulesForChangeLikes = Joi.object({
  likes: Joi.number().required().max(5),
  counter: Joi.number().required(),
});

exports.commentIdSchema = Joi.object({
  commentId: Joi.string().custom((value, helpers) => {
    const isValidObjId = ObjectId.isValid(value);
    if (!isValidObjId) {
      return helpers.error('Invalid contact id. Must be object id');
    }
    return value;
  }),
});
