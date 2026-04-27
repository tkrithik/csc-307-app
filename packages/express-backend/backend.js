import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import {
  getUsers,
  getUserById,
  addUser,
  findUserByName,
  findUserByJob,
  findUserByNameAndJob,
  deleteUserById,
} from "./services/user-service.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users")
  .catch((error) => console.log(error));

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  if (name && job) {
    findUserByNameAndJob(name, job)
      .then((users) => res.send(users))
      .catch((error) => res.status(500).send(error));
  } else if (name) {
    findUserByName(name)
      .then((users) => res.send(users))
      .catch((error) => res.status(500).send(error));
  } else if (job) {
    findUserByJob(job)
      .then((users) => res.send(users))
      .catch((error) => res.status(500).send(error));
  } else {
    getUsers()
      .then((users) => res.send(users))
      .catch((error) => res.status(500).send(error));
  }
});

app.get("/users/:id", (req, res) => {
  getUserById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send("User not found");
      } else {
        res.send(user);
      }
    })
    .catch((error) => res.status(500).send(error));
});

app.post("/users", (req, res) => {
  addUser(req.body)
    .then((user) => res.status(201).send(user))
    .catch((error) => res.status(500).send(error));
});

app.delete("/users/:id", (req, res) => {
  deleteUserById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send("User not found");
      } else {
        res.send(user);
      }
    })
    .catch((error) => res.status(500).send(error));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
