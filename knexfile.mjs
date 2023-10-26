// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./storage/dev.sqlite3",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  production: {
    client: "sqlite3",
    connection: {
      filename: "./storage/prod.sqlite3",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
