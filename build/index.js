"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//nodemon --exec ts-node src/index.ts
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var express_handlebars_1 = require("express-handlebars");
var app = (0, express_1.default)();
var port = 3000;
//HTTP logger
// app.use(morgan('combined'));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.engine('hbs', (0, express_handlebars_1.engine)({
    extname: '.hbs',
    helpers: require('./helpers/handlebars'),
}));
app.set('view engine', 'hbs');
app.set('views', path_1.default.join(__dirname, '/resources/views'));
app.get('/', function (req, res) {
    res.render('home');
});
app.get('/about', function (req, res) {
    res.render('about');
});
app.get('/games', function (req, res) {
    res.render('list-games');
});
app.get('/contact', function (req, res) {
    res.render('contact');
});
app.get('/test', function (req, res) {
    res.render('partials/test');
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
