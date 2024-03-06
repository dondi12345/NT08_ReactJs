//nodemon --exec ts-node src/index.ts
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
const proxy = require('express-http-proxy');
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import sass from 'sass';

const app = express()
const port = 80

//HTTP logger
// app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, "public")));

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/resources/views'));

app.get('/', (req, res) => {
    res.render('home');
});
app.get('/test', (req, res) => {
    console.log("Test");
    res.send("Hello");
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/games', (req, res) => {
    res.render('list-games');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/test', (req, res) => {
    res.render('partials/test')
})


// Define the source domain and port
const sourceDomain = 'nt08.ntdream.click';
const sourcePort = 80; // Assuming default HTTP port

// Define the destination URL including the port
const destinationURL = `http://ntdream.click:${port}`;

// Middleware to handle redirection
app.use(proxy(sourceDomain, {
    proxyReqPathResolver: (req) => req.url, // Use the same path as the original request
    proxyErrorHandler: (err, res) => {
        // Handle proxy errors if needed
        console.error('Proxy error:', err);
        res.status(500).send('Proxy error occurred');
    },
    proxyReqOptDecorator: (proxyReqOpts, req) => {
        // Add custom headers if needed
        return proxyReqOpts;
    },
    proxyReqBodyDecorator: (bodyContent, srcReq) => {
        // Modify request body if needed
        return bodyContent;
    },
    userResHeaderDecorator: (headers, userReq, userRes, proxyReq, proxyRes) => {
        // Modify response headers if needed
        return headers;
    },
    https: false // Set to true if the destination URL is HTTPS
}));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});