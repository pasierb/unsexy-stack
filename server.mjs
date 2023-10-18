import express from "express";
import { createRequestHandler } from "@remix-run/express";
import * as build from "./build/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

// just to test routes definition precedence.
app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.all("*", createRequestHandler({ build }));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
