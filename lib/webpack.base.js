const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const glob = require('glob');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const Autoprefixer = require('autoprefixer');

const projecRoot = process.cwd(); //


const setMPA = () => {
  const entry = {};
  const HtmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projecRoot, './src/*/index.js'));
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    return HtmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(projecRoot, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: ['vendors', pageName],
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      }),
    );
  });
  return {
    entry,
    HtmlWebpackPlugins,
  };
};
const {
  entry,
  HtmlWebpackPlugins,
} = setMPA();
module.exports = {
  entry,
  module: {
    rules: [{
        test: /.js$/,
        use: 'babel-loader',
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                Autoprefixer({
                  browsers: ['last 2 version', '>1%', 'ios 7'],
                }),
              ],
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
        ],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8][ext]',
          },
        }],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    function errorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          process.exit(1);
        }
      });
    },
  ].concat(HtmlWebpackPlugins),

};