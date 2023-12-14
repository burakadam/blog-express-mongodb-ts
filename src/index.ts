import bodyParser from 'body-parser';
import compression from 'compression';
import { connectDB } from 'config/db';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import http from 'http';
import { errorHandler } from 'middleware/error';
import 'module-alias/register';
import indexRouter from 'router';

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
app.use(indexRouter);

app.use(errorHandler);

const server = http.createServer(app);

// MONGODB Connection
connectDB();

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
