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

const app = express();

// Set CORS options based on the REACT_URL environment variable
const corsOptions = {
	origin: process.env.REACT_URL,
	credentials: true,
};

app.use(cors(corsOptions));

// Config body-parser for handling large payloads
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Config cookie-parser
app.use(cookieParser());

// Setup view engine and routes
viewEngine(app);
initWebRoutes(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Listening to port ${port}`);
	console.log(`React URL: ${process.env.REACT_URL}`);
});
