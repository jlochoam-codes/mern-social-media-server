import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoute from './Routes/AuthRoutes.js';
import UserRoute from './Routes/UserRoutes.js';
import PostRoute from './Routes/PostRoutes.js';
import UploadRoute from './Routes/UploadRoutes.js';

const app = express();

// Middleware
const bodyParserConfig = {
  limit: "30mb",
  extended: true,
};
app.use(bodyParser.json(bodyParserConfig));
app.use(bodyParser.urlencoded(bodyParserConfig));
app.use(cors());

// Set required env variables
dotenv.config();

// DB connection and server initialization
const mongoDbConnOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
const serverPort = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_DB_CONN_STR, mongoDbConnOptions)
  .then(() => app.listen(
    serverPort, () => console.log(`Listening on port ${serverPort}`)))
  .catch((err) => console.log(err));

// Routes
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/', PostRoute);
app.use('/upload/image', UploadRoute);
