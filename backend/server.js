import { createServer } from "http"
import { app } from "./app.js";

const PORT = process.env.PORT || 3000;

const server = new createServer(app);

server.listen(PORT, () => {
    console.log(`Server started at PORT:${PORT}`);

})