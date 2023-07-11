import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connect from './config/database.js';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import routes from './routers/index.js';
import socketRouter from './routers/socket.js';
const app = express();
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser('MY SECRET'));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '30mb' }));

dotenv.config();

// Connect to the database
connect.connect();

const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use('/', routes);
app.use('/', socketRouter(io));

server.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server running on PORT ${PORT}`);
});