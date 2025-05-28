import dotenv from "dotenv"
dotenv.config({path:".env"});

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    return res.send({
        name: "shashank",
        age: 21,
        collage: "MNIT"
    })
})

export { app };
