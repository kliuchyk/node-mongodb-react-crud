import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect to the MongoDB cluster to the Server
  await client.connect();
  // send a ping to the server to check if the connection is successful
  await client.db("admin").command({ ping: 1 });
  console.log("Connected successfully to server");
} catch (error) {
  console.error(error);
}

let db = client.db("employees");

export default db;
