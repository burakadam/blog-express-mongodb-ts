import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL!);
mongoose.connection.on('error', (error: Error) =>
  console.log(`Mongo error ${error}`)
);
