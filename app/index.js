'use strict';

const realServer = require('./realserver');
const proxyServer = require('./proxyserver');

realServer(3000);
proxyServer(8000);