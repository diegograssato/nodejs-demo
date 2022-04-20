import * as dotenv from "dotenv";

import cors from 'cors'
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { router } from '@routes/index';
import helmet from "helmet";
import { errorHandler } from "./middlewares/error.middleware";
import { notFoundHandler } from "./middlewares/not-found.middleware";
import compression from 'compression';
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

dotenv.config();

const App: Application = express();

/** Logging */
App.use(morgan('dev'));

App.use(compression());
App.use(helmet());
App.use(cors());

/** Parse the request */
App.use(express.urlencoded({ extended: false }));
// parse incoming request body and append data to `req.body`
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));

/** Takes care of JSON data */
App.use(express.json());


/** Routes */
App.use('/', router);

/** Error handling */
App.use(errorHandler);
App.use(notFoundHandler);



/** Server */
const PORT: number = parseInt(process.env.PORT as string, 10) || 800;

// App.listen(PORT, () => {
//   console.log(`The server is running on port ${PORT}`);
// })

import app from './app';
app.listen(3333);

//httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));


