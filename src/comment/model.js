const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const commentSchema = new Schema({
  name: {
    type: String,
    max: 50,
    required: true,
    min: 2,
  },
  text: {
    type: String,
    min: 10,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Number,
    required: true,
    default: Date.now(),
  },
});

commentSchema.plugin(mongoosePaginate);

const CommentModel = mongoose.model('Comment', commentSchema);
module.exports = CommentModel;
