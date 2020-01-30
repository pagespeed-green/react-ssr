process.env.NODE_ENV = 'test';

// Register babel so that it will transpile ES6 to ES5
// before our tests run.
require('@babel/register')();
require('core-js/stable');
require('regenerator-runtime/runtime');

// Disable webpack-specific features for tests since
// Mocha doesn't know what to do with them.
require.extensions['.css'] = () => null;
require.extensions['.scss'] = () => null;
require.extensions['.png'] = () => null;
require.extensions['.jpg'] = () => null;
require.extensions['.svg'] = () => null;
require.extensions['.gif'] = () => null;

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM(
  '<!doctype html><html><body></body></html>',
  {
    url: "https://example.org/",
    includeNodeLocations: true,
  },
);

const { window } = jsdom;
window.Date = Date;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};
copyProps(window, global);