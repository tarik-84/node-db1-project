module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/budget.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  // update the following configuration to use PostgreSQL
  production: {
    client: "pg",
    connection: {
      host: "ec2-50-17-90-177.compute-1.amazonaws.com", // if the server is not running on your computer provide the network address
      database: "d9ebda5f96vput", // <-- update
      user: "zkvcptrtcqgpen", // <-- update
      password: "c63723e281479451c7825c2d61db56264152869660390f85ff48067337d5516d", // <-- update
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};

