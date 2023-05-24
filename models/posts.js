const mongoose = require('mongoose')

const Posts = new mongoose.Schema(
  {
    img: {
      type: 'string',
      required: true
    },
    title: {
      type: 'string',
      required: true
    },
    descr: {
      type: 'string',
      required: true
    }
  }
)
module.exports = mongoose.model('posts', Posts)