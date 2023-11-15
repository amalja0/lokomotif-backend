import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";

const app = express();
dotenv.config();

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT, (err) => 
    err 
        ? console.log(err)
        : console.log(`Server started and running on http://${process.env.HOST}:${PORT}`)
);

import { run } from "./src/utils/consumer.js";

try {
    run();
} catch (error) {
    console.error(error);
}