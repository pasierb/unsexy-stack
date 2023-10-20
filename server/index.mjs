import express from "express";
import bodyParser from "body-parser";
import { mountAuth } from "./auth/index.mjs";
import { createRequestHandler } from "@remix-run/express";

import * as build from "../build/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

// Auth routes.
mountAuth(app, "/auth");

// Render all other routes with Remix.
app.all(
  "*",
  createRequestHandler({
    build,
    getLoadContext(req) {
      return {
        user: req.user, // Set user in Remix context.
      };
    },
  })
);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
