#Notes to Full stack JS App


## A full stack boilerplate for JS Apps


### Package install

```sh
•	npm install
•	npm run dev
•	npm init # to create package.json
```

### Knex Database
```sh
npm install knex sqlite3
npx knex migrate:make table_name
npx knex migrate:latest
npx knex seed:make table_name
npx knex seed:run
```