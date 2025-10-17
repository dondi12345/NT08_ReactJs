//nodemon --exec ts-node src/index.ts
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import sass from 'sass';
const http = require('http');
const https = require('https');
const fs = require('fs');

const app = express()
const port = 8000
const port_ssl = 8001

//HTTP logger
// app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, "../public")));

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../resources/views'));

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

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})