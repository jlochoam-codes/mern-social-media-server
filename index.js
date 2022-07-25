import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

const bodyParserConfig = {
  limit: "30mb",
  extended: true,
};
// Set MONGO_USER and MONGO_PASSWORD env variables with correct values
const mongoDbConnStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@social-media-app.smcpy31.mongodb.net/social-media-app?retryWrites=true&w=majority`;
const mongoDbConnOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
const serverPort = process.env.PORT || 5000;

app.use(bodyParser.json(bodyParserConfig));
app.use(bodyParser.urlencoded(bodyParserConfig));

mongoose.connect(mongoDbConnStr, mongoDbConnOptions)
  .then(() => app.listen(
    serverPort, () => console.log(`Listening on port ${serverPort}`)));
