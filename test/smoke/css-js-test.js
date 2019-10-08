const glob = require('glob-all');

describe('checking generate css js files', () => {
  it('should generate html files', (done) => {
    const files = glob.sync([
      './dist/index_*.js',
      './dist/search_*.js',
      './dist/index_*.css',
      './dist/search_*.css',
    ]);
    if (files.length > 0) {
      done();
    } else {
      throw new Errow('no css js files generate');
    }
  })
})