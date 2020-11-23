const CommentModel = require('./model');

exports.createComment = async (req, res, next) => {
  try {
    const { body } = req;

    const comment = await CommentModel.create(body);

    res.status(201).send(comment);
  } catch (error) {
    next(error);
  }
};

exports.getComments = async (req, res, next) => {
  try {
    const { page, limit, popular } = req.query;

    const options = {
      page,
      limit,
      sort: { likes: popular },
    };

    let result = null;

    if (page && limit && popular) {
      result = await CommentModel.paginate({}, options);
    }

    if (page && limit && !popular) {
      result = await CommentModel.paginate({}, options);
    }

    if (!page && !limit) {
      result = await CommentModel.find();
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.changeLikesInComment = async (req, res, next) => {
  try {
    const { params } = req;
    const { body } = req;

    if (body.likes) {
      const updatedComment = await CommentModel.findByIdAndUpdate(
        params.commentId,
        { likes: body.likes },
        { new: true },
      );
      if (updatedComment) {
        res.status(200).send(updatedComment);
        return;
      }
    } else {
      const updatedComment = await CommentModel.findByIdAndUpdate(
        params.commentId,
        { dislikes: body.dislikes },
        { new: true },
      );
      if (updatedComment) {
        res.status(200).send(updatedComment);
        return;
      }
    }

    if (!updatedComment) {
      res.status(404).json('not found');
    }
  } catch (error) {
    next(error);
  }
};
