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