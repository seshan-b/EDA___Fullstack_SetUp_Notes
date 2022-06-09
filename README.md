# Notes to Full stack JS App

## A full stack boilerplate for JS Apps

### Package install

```sh
•	npm init # to create package.json
•	npm install express
•	npm run webpack
•	npm install
•	npm run dev
```

### Knex Database

```sh
npm install knex sqlite3
npx knex migrate:make table_name
npx knex migrate:latest
npx knex seed:make table_name
npx knex seed:run
```

--- 

## Client

### 1. Components Folder

#### `App.jsx` | `ListOfItems.jsx` | `SingleItem.jsx`

```js
import React from 'react'
import { Route } from 'react-router-dom'

import Component from './component'


function App() {
  return (
    <>
      <div className='title'>
        <img src='/images/image-name.gif' />
        <h1>Title</h1>
      </div>

        <Route path="/" component={Nav} />
        <Route path="/" exact component={Home} />
        <Route path="/continents/:name" component={ListOfItems} />
        <Route path="/continent/:name/:id" component={SingleItem} />
      </div>
    </>
  )
}

export default App
```

### 2. Index File
#### `index.js`
```js
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById('app')
  )
})

```

### 3. Webpack Config File
#### `Webpack.config.js`
```js
const path = require('path')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'index.js'),
  output: {
    path: path.join(__dirname, '../server/public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map'
}

```

---
## Rest API
### 1. API Folder
#### `Api.js`
```js
import request from 'superagent'

const serverURL = '/api/v1'

export function getSomething () {
  return request
    .get(`${serverURL}/welcome`)
    .then(res => {
      return res.body
    })
    .catch(err => {
      console.error('ERROR:', err.message)
    })
}

```

--- 
## Database
### Knex Database
#### 1. Run this command
```sh 
  npm run knex init
```
This will create a file in ***server/db/knexfile.js***

#### 2. `knexfile.js`

```js
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    useNullAsDefault: true
  }
}
```
#### 3. Run this command
```sh 
  npm run knex migrate:make table_name
```
* create schema at migrations folder
 #### `20220609154933_table_name.js`
```js
exports.up = function (knex) {
  return knex.schema.createTable('films', function (table) {
    table.increments('id').primary()
    table.string('name')
     table.integer( 'userId' ).references( 'user.id' );
  })
}
``` 

```sh

#1 Check and run the latest migration
npm run knex migrate:latest

#2 Make a table
npm run knex seed:make table_name

#3 Run seed data
npm run knex seed:run

```

---

## Server
#### `server.js`
```js
const path = require('path')
const express = require('express')

const server = express()

server.use(express.static(path.join(__dirname, 'public')))

module.exports = server
```

###  Db folder for function 
#### `db.js`

```js
const config = require('./knexfile').development
const connection = require('knex')(config)

module.exports = {
  doSomethingById,
  getCommentById

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

```

### .insert()

```js
// .then() ----> .then is the promise /response u getting back from the request
function addPost(post, db = connection) {
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
```

### .update()
```js
function updateComment(commentId, updatedComment, db = connection) {
    return db('comments')
        .where('id', commentId)
        .update({
            post_id: updatedComment.postId,
            comment: updatedComment.comment
        })
}

```

### .delete()
```js
function deleteComment (commentId, db = connection) {
  return db('comments')
    .where('id', commentId)
    .delete()
} 
```

---

## Routes
* GET   //  to read database
```js

router.get('/:postId/comments', (req, res) => {
  const postId = Number(req.params.postId)

  db.getComments(postId)
  .then((comments)=> {
    return res.json(comments)
  })
  .catch((err) => console.error(err))
})

```

* POST  // to add thing to database

```js

router.post('/:postId/comments', (req, res) => {
  const postId = Number(req.params.postId)
  const { comments } = req.body

  db.postComment(postId, comments)
    .then((comment) => {
      return res.json(comment)
    })
    .catch((err) => console.error(err))
})

```

* PATCH    //  to update piece of database
* PUT   // to update entire database or piece of data
```js

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

```

* DELETE to delete database
```

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
    
  db.deletePost(id)
  .then(()=> {
    return res.sendStatus(204)
  })
  .catch((err) => console.error(err))
})

```

---


###  Public
#### `index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link href="/main.css" rel="stylesheet">
  <title>React and web APIs!</title>
</head>
<body>
  <div id="app"></div>

  <script src="/bundle.js"></script>
</body>
</html>

```
#### `main.css`

#### `images`
All images go here


#### `index.js`
```

const server = require('./server')
server.on('unhandledRejection', console.log.bind(console))


const port = process.env.PORT || 3000

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server is listening on port', port)
})

```

`Bundle.js`
The minified Javascript goes into this file. This file is create and updated automatically.


`Server.js`
```
const path = require('path')
const express = require('express')

const widgets = require('./routes/widgets')

const server = express()
server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/widgets', widgets)

module.exports = server

```

#### `package.json`
All the external package information goes here so you can run ***npm install*** on another environment and get all the node_modules

---

## Testing


Testing routes with SuperTest
* Separate your server from making it listen
* server.js contains the server config and the routes
* index.js imports the server and makes it listen
* npm install jest supertest -D
* touch server.test.js
* Test routes 🚀
