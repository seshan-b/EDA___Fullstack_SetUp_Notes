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
#### 1. Run these commands
```ssh 
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