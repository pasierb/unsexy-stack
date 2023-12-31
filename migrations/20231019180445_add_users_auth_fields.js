/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) => {
  return knex.schema.table("users", (table) => {
    table.string("hashed_password");
    table.string("salt");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
  return knex.schema.table("users", (table) => {
    table.dropColumn("hashed_password");
    table.dropColumn("salt");
  });
};
