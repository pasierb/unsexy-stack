import Knex from "knex";
import knexConfig from "../knexfile.mjs";

export const knex = Knex(knexConfig.development);
