const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');

class App {
  constructor() {
    this.app = express();
    this.loadHelpers();
  }

  loadHelpers() {
    Object.assign(this.app, require('./helpers'))
  }

  async init() {
    this.addRoutes();
    this.addGlobalMiddlewares();
    this.useLibraries();
    return await this.connectToDatabase();
  }

  useLibraries() {
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'pug');
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, 'public')));
  }

  async connectToDatabase() {
    const { default_connection, connections } = require('./config/database')(this.app);

    const connection = connections[default_connection];

    if (!connection)
      throw new Error(`Configuration for ${default_connection} doesn't exist.`)

    let driver = require(`./shared/drivers/${connection.driver}`);

    driver = new driver(connection);
    return await driver.connect();
  }

  addRoutes() {
    const route_path = path.join(__dirname, 'routes');
    this.getFiles(route_path).forEach(r => this.app.use(require(path.join(route_path.replace(), r))))
  }

  addGlobalMiddlewares() {
    const middleware_path = path.join(__dirname, './app/middlewares');
    this.getFiles(middleware_path).forEach(m => this.app.use(require(path.join(middleware_path, m))))
  }

  getFiles(target) {
    try {
      return fs.readdirSync(target)
    }
    catch (e) {
      console.log("App -> getFiles -> e", e)
      throw new Error('Target directory doesn\'t exists');
    }
  }

  setAttribute(key, value) {
    this.app.set(key, value);
    return this.app;
  }

}

module.exports = new App()