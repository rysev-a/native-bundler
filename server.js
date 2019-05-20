const fs = require('fs');
const connect = require('connect');
const static = require('serve-static');
const { compilePug } = require('./tasks/templates');
const { compileStyles } = require('./tasks/styles');

const server = connect();

server.use(static(__dirname + '/public'));
server.listen(4000);

const livereload = require('livereload');
const lrserver = livereload.createServer();

lrserver.watch(__dirname + '/public');

const sourceServer = livereload.createServer({
  port: 35725,
});
const watcher = sourceServer.watch(__dirname + '/src');

const compile = () => {

  const publicDirs = ['./public', './public/styles'];
  publicDirs.map(dir => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
  })

  compilePug();
  compileStyles();
};

watcher.on('change', compile);
compile();

const indexPage = fs.readFileSync('./public/index.html', 'utf8');
const getIndexPage = (reqest, response) => response.end(indexPage);

const routes = ['users', 'users/:id', 'roles'];
routes.map(route => server.use(`/${route}`, getIndexPage));

console.log('listen on http://localhost:4000');
