import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id
import { ObjectId } from "mongodb";

// router is an instance of express router
// we use it to define our routes
// The router will be added as a middleware and will take control of
// requests starting with the path we specify (/records)
const router = express.Router();

// this section will contain all the routes that we need
router.get("/", async (req, res) => {
  // Get the data from the database
  const collection = await db.collection("records");
  const results = await collection.find({}).toArray();
  res.send(records).status(200);
});

// get a single record
router.get("/:id", async (req, res) => {
  const collection = await db.collection("records");
  const query = { _id: ObjectId(req.params.id) };
  const record = await collection.findOne(query);

  if (!record) {
    res.status(404).send("Record not found");
    return;
  }
  res.send(record).status(200);
});

// create a record
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    const collection = await db.collection("records");
    const result = await collection.insertOne(newDocument);
    // res.send(result).status(204);
    res.send(result.ops[0]).status(201);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding record");
  }
});

// update a record
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };

    const collection = await db.collection("records");
    const result = await collection.updateOne(query, updates);
    res.send(result).status(204);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating record");
  }
});

// delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: ObjectId(req.params.id) };
    const collection = await db.collection("records");
    const result = await collection.deleteOne(query);

    res.send(result).status(204);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting record");
  }
});

export default router;
