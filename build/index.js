"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//nodemon --exec ts-node src/index.ts
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = require("express-handlebars");
const http = require('http');
const https = require('https');
const fs = require('fs');
const app = (0, express_1.default)();
const port = 8000;
const port_ssl = 8001;
//HTTP logger
// app.use(morgan('combined'));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.engine('hbs', (0, express_handlebars_1.engine)({
    extname: '.hbs',
    helpers: require('./helpers/handlebars'),
}));
app.set('view engine', 'hbs');
app.set('views', path_1.default.join(__dirname, '../resources/views'));
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
    res.render('partials/test');
});
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.crt"),
};
const server_ssl = https.createServer(options, app);
server_ssl.listen(port_ssl, "0.0.0.0", () => {
    console.log(`Worker ${process.pid} API listening on port: ${port_ssl}`);
});
