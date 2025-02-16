import express from "express";
import cors from "cors";
import records from "./routes/records.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/records", records);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
