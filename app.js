import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import indexRouter from './routes/indexRouter.js';
import fighterRouter from './routes/fighterRouter.js';
import planetRouter from './routes/planetRouter.js';

const PORT       = 3000;
const app        = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use('/', indexRouter);
app.use('/fighters', fighterRouter);
app.use('/planets', planetRouter);

app.listen(PORT, (error) => {
  if (error) throw error;

  console.log(`Server initiated! Listening on PORT - ${PORT}`);
})
