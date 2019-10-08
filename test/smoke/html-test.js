const glob = require('glob-all');
describe('checking generate html files', () => {
  it('should generate html files', (done) => {
    const files = glob.sync(['./dist/index.html', './dist/search.html']);
    if (files.length > 0) {
      done();
    } else {
      throw new Errow('no html files generate');
    }
  })
})