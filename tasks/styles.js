const postcss = require('postcss');
const postcssImport = require('postcss-import');
const fs = require('fs');

const compileStyles = () => {
  fs.readFile('./src/styles/main.css', (err, css) => {
    postcss([postcssImport])
      .process(css, {
        from: './src/styles/main.css',
        to: './public/styles/main.css',
      })
      .then(result => {
        fs.writeFile('./public/styles/main.css', result.css, () => true);
        if (result.map) {
          fs.writeFile('./public/styles/main.css.map', result.map, () => true);
        }

        console.log('\x1b[32m%s\x1b[0m', 'compile postcss styles');
      });
  });
};

module.exports = { compileStyles };
