import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/index';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file based on NODE_ENV
dotenv.config({
    path: process.env.NODE_ENV === 'admin' ? '.env.admin' : '.env.user',
});

const app1 = express();
const app2 = express();

// Set CORS options for the first app
const corsOptions1 = {
    origin: process.env.REACT_URL,
    credentials: true,
};

// Set CORS options for the second app
const corsOptions2 = {
    origin: process.env.REACT_URL1,
    credentials: true,
};

// Common configurations for both apps
const configureApp = (app, corsOptions) => {
    app.use(cors(corsOptions));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
    app.use(cookieParser());
    viewEngine(app);
    initWebRoutes(app);
};

// Configure both apps
configureApp(app1, corsOptions1);
configureApp(app2, corsOptions2);

// Get ports from environment variables
const port1 = process.env.PORT || 8080;
const port2 = process.env.PORT1 || 8081;

// Start both servers
app1.listen(port1, () => {
    console.log(`Server 1 is listening on port ${port1}`);
    console.log(`React URL 1: ${process.env.REACT_URL}`);
});

app2.listen(port2, () => {
    console.log(`Server 2 is listening on port ${port2}`);
    console.log(`React URL 2: ${process.env.REACT_URL1}`);
});
