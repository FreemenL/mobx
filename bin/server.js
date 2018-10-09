let path = require("path");
let fs = require("fs");

let babelrc = JSON.parse(fs.readFileSync("./.babelrc"));

require('babel-register')(babelrc);

global.__CLIENT__ = false;
global.__SERVER__ = true;

require("../src/server");