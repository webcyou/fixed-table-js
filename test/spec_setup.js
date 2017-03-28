process.env.NODE_ENV = 'test';
const jsdom  = require('jsdom');

global.document = jsdom.jsdom('<body><div></div></body>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
