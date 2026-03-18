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
const port = 9000
const port_ssl = 9001

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
app.get('/game', (req, res) => {
    res.render('game');
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

const options = {
    key: fs.existsSync("server.key") ? fs.readFileSync("server.key") : null,
    cert: fs.existsSync("server.crt") ? fs.readFileSync("server.crt") : null,
};
if (options.key && options.cert) {  
    const server_ssl = https.createServer(options, app);
    server_ssl.listen(port_ssl, "0.0.0.0", () => {
        console.log(`Worker ${process.pid} API listening on port: ${port_ssl}`);
    });
}