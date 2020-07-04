// Update with your config settings.
require("dotenv").config();
module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations/'
    },
    seeds:{
      directory: './data/seeds/'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations/'
    },
    seeds:{
      directory: './data/seeds/'
    }
  }

};
