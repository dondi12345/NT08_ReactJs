//nodemon --exec ts-node src/index.ts
import path from 'path';
import express from 'express';
import morgan  from 'morgan';
import { engine } from 'express-handlebars';
import sass from 'sass';

const app = express()
const port = 3000

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
app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/partial', (req, res)=>{
  res.render('partials/test')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})