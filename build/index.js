"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//nodemon --exec ts-node src/index.ts
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = require("express-handlebars");
const fs = require('fs');
const handlebars = require('handlebars');
const app = (0, express_1.default)();
const port = 8000;
//HTTP logger
// app.use(morgan('combined'));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.engine('hbs', (0, express_handlebars_1.engine)({
    extname: '.hbs',
    helpers: require('./helpers/handlebars'),
}));
app.set('view engine', 'hbs');
app.set('views', path_1.default.join(__dirname, '../resources/views'));
// Read the partial file
const fish_io = fs.readFileSync(path_1.default.join(__dirname, '../FishIO/index.html'), 'utf8');
// Register the partial
handlebars.registerPartial('fish_io', fish_io);
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
app.get('/game/fish_io', (req, res) => {
    res.render('partials/test');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
