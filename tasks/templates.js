const pug = require('pug');
const fs = require('fs');

const templates = ['index', 'projects', 'products'];

const compilePug = () => {
  templates.map(template => {
    const compileTemplate = pug.compileFile(`./src/templates/${template}.pug`, {
      pretty: true,
    });
    fs.writeFile(`./public/${template}.html`, compileTemplate(), () => {});
  });

  console.log('\x1b[32m%s\x1b[0m', 'compile pug templates');
};

module.exports = { compilePug };
