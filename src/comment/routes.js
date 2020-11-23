const { Router } = require('express');
const commentRouter = Router();
const { handleValidate } = require('../helpers/validate');
const {
  commentRulesSchema,
  rulesForChangeLikes,
  commentIdSchema,
} = require('./schema');
const {
  createComment,
  getComments,
  changeLikesInComment,
} = require('./controllers');

commentRouter.post('/', handleValidate(commentRulesSchema), createComment);
commentRouter.get('/', getComments);
commentRouter.patch(
  '/:commentId',
  handleValidate(commentIdSchema, 'params'),
  handleValidate(rulesForChangeLikes),
  changeLikesInComment,
);

module.exports = commentRouter;
