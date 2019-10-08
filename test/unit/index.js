const path = require('path');
console.log('0000000');
process.chdir(path.join(__dirname, 'smoke/template'));
describe('builder-webpack test case', () => {
  require('./unit/webpack-base-test');
})