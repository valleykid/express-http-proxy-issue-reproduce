'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const browserify = require('browserify');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/dist/index.js', (req, res) => {
  browserify('./public/index.js')
    .transform('babelify', {presets: ['env', 'stage-0']})
    .bundle((err, buf) => {
      res.set('Content-Type', 'text/javascript');
      res.send(buf);
    });
})

app.use('/', proxy('http://127.0.0.1:3000/', {
  filter: function(req, res) {
    return req.method == 'GET' || req.method == 'POST';
  }
}));

module.exports = function(port) {
  app.listen(port, () => 
    console.log(`Proxy-server listening on port ${port}!`)
  );
};