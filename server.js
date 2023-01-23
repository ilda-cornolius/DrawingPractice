const http = require('http');

const express = require('express');
const app = express();

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(express.static('views'));

const hostname = '127.0.0.1';
const port = 3000;
app.listen(3000, () => {
    console.log("Application started and Listening on port 3000");
  });


  app.get('/', function (req, res)
  {
      res.render('index.html');
  });
