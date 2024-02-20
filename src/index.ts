import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import mongoose from 'mongoose';

import router from './router';

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(compression());

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

const mongoUrl = process.env.MONGO_URL || 'mongodb+srv://nonos:CDtk5cAQWDhFvcZL@cluster0.2lv0tkw.mongodb.net/';

mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB', error.message);
});

app.use('/', router())