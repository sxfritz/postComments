import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import express from "express"
import cors from "cors";

const app = express();
dotenv.config()
const PORT = process.env.PORT;
const dbPW = process.env.DATABASE_PW;
const dbUSER = process.env.DATABASE_USER;
app.use(cors());

mongoose.set('useUnifiedTopology', true)
mongoose.connect(`mongodb+srv://${dbUSER}:${dbPW}@cluster0.imf9d.mongodb.net/postcomments?retryWrites=true&w=majority`, { useNewUrlParser: true });

const commentSchema = new mongoose.Schema({
    Name: String,
    Comment: String,
    Date: {
        type: Date,
        default: Date.now
    },
    Active: {
        type: Boolean,
        default: true
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const comm = mongoose.model("fritzpostcomments", commentSchema);

import commRoute from "./routes/comments.js" 
app.use('/subComm', commRoute)

app.get("/", (req, res) => {
    console.log("at the post")
});

app.listen(PORT, () => {
    console.log("server is listening on port " + PORT)
});

