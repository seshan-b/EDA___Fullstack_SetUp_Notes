const express = require('express')
const router = express.Router()
const request = require('superagent')
const db = require('../db/db')

module.exports = router

// Server use '/api/v1/home'
router.get('/', (req, res) => {
  request.get('https://random-d.uk/api/v2/random')
    .then(response => {
      res.json({ output: response.body.url })
      return null
    }).catch(err => console.error(err))
})

router.post('/', (req, res) => {
  console.log(req.body)
  res.json(req.body)
})

router.get('/:postId/comments', (req, res) => {
  const postId = Number(req.params.postId)

  db.getComments(postId)
    .then((comments) => {
      return res.json(comments)
    })
    .catch((err) => console.error(err))
})

router.post('/:postId/comments', (req, res) => {
  const postId = Number(req.params.postId)
  const { comments } = req.body

  db.postComment(postId, comments)
    .then((comment) => {
      return res.json(comment)
    })
    .catch((err) => console.error(err))
})

router.patch('/:id', (req, res) => {
  const id = Number(req.params.id)

  const { title, paragraphs } = req.body

  const updatedPost = {
    title: title,
    paragraphs: paragraphs
  }

  db.updatePost(id, updatedPost)
    .then(() => {
      return db.getPostById(id)
    })
    .then((post) => {
      res.json(post)
      return null
    })
    .catch((err) => console.error(err))
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)

  db.deletePost(id)
    .then(() => {
      return res.sendStatus(204)
    })
    .catch((err) => console.error(err))
})
