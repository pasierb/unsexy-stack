import Knex from "knex";
import knexConfig from "../knexfile.mjs";
import { env } from "./environment.mjs";

export const knex = Knex(knexConfig[env]);
