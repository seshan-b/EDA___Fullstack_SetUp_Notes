const config = require('./knexfile').development
const connection = require('knex')(config)

module.exports = {
  doSomethingById,
  getCommentById,
  addPost,
  updateComment,
  deleteComment

}

function doSomethingById (postId, db = connection) {
  return db('table_Name')
    .select()
    .then(() => { return db('') })
    .insert()
    .where('post_id', postId)
    .update()
    .first()
}

// .where('name_in_column', alia)
// .select('what we select')

function getCommentById (commentId, db = connection) {
  return db('Comments')
    .where('id', commentId)
    .select(
      'id',
      'post_id as postId',
      'date_posted as datePosted',
      'comment'
    )
    .first()
}

function addPost (post, db = connection) {
  return db('Posts')
    .insert(
      {
        title: post.title,
        date_created: new Date(Date.now()),
        comment_count: 0,
        paragraphs: JSON.stringify(post.paragraphs)
      }
    )
    .then(() => {
      return {
        id: post.id,
        title: post.title,
        date_created: post.date_created,
        comment_count: post.comment_count,
        paragraphs: JSON.stringify(post.paragraphs)
      }
    }
    )
}

function updateComment (commentId, updatedComment, db = connection) {
  return db('comments')
    .where('id', commentId)
    .update({
      post_id: updatedComment.postId,
      comment: updatedComment.comment
    })
}

function deleteComment (commentId, db = connection) {
  return db('comments')
    .where('id', commentId)
    .delete()
}
