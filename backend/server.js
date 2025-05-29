import { createServer } from "http"
import { app } from "./app.js";
import connectDB from "./db/dbConnect.js"

const PORT = process.env.PORT || 3000;
const mongoose_uri = process.env.MONGODB_URI;

const server = new createServer(app);

connectDB(mongoose_uri)
  .then(() => {
    app.on("error", (error) => {
      console.log("ERR: ", error);
      throw error;
    });
    server.listen(PORT, () => {
      console.log(`Server started at PORT:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGO db connection failed");
  });