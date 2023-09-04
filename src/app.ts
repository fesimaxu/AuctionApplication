import express from "express";
import config from "./config/index";
import { db } from "./config/dbConfig";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { HttpError } from 'http-errors';



const app = express();

const { PORT } = config;

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());




const BUILD_PORT = PORT;

db.sync({}).then(()=>{
    console.log(`Database is succeffully connected`);
}).catch((error: HttpError)=>{
    console.log(`Database error at ${error}`)
})



app.listen(BUILD_PORT || 3000 , () => {
    console.log(`Auction Application running on http://localhost:${BUILD_PORT}/`)
});

export default app;
