#Notes to Full stack JS App


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

#
## Client
### 1. Components
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