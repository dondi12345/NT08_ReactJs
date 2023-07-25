//nodemon --exec ts-node src/index.ts
import path from 'path';
import express from 'express';
import morgan  from 'morgan';
import { engine } from 'express-handlebars';
import sass from 'sass';

const app = express()
const port = 8000

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

app.get('/test', (req, res)=>{
  res.render('partials/test')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})