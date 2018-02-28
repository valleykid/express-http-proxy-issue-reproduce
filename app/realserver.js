'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Hello express-world!'));

app.post('/', (req, res) => {
  const data = req.body;
  console.log('\nPostbody:', data);
  res.send(data);
});

module.exports = function(port) {
  app.listen(port, () => 
    console.log(`Real-server listening on port ${port}!`)
  );
};