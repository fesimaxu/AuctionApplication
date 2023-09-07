import express from "express";
import config from "./config";
import { db } from "./config/dbConfig";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { HttpError } from 'http-errors';
import { errorMessages, notFoundError } from "./middleware/errorMessage";
import userRoutes from "./routes/userRoutes";
import itemRoutes from "./routes/itemRoutes";


const app = express();

const { PORT } = config;

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.use('/users', userRoutes);
app.use('/item', itemRoutes);

app.all('*', notFoundError);
app.use(errorMessages);



db.sync({alter: true}).then(()=>{
    console.log(`Database is successfully connected`);
}).catch((error: HttpError)=>{
    console.log(`Database error at ${error}`)
})

const BUILD_PORT = PORT;


app.listen(BUILD_PORT || 3000 , () => {
    console.log(`Auction Application running on http://localhost:${BUILD_PORT}/`)
});

export default app;
