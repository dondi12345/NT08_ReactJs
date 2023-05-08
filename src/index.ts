//nodemon --exec ts-node src/index.ts
import path from 'path';
import express from 'express';
import morgan  from 'morgan';
import { engine } from 'express-handlebars';
import sass from 'sass';

const app = express()
const port = 3000

//HTTP logger
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, "public")));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/resources/views'));

app.get('/', (req, res) => {
  res.render('home');
});
app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})