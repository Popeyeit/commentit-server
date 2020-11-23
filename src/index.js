const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const commentRouter = require('./comment/routes');

class Server {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    await this.initDbConnection();
    this.initRouters();
    this.initGlobalError();
    this.startListening();
  }
  initServer() {
    this.server = express();
  }
  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  async initDbConnection() {
    try {
      mongoose.set('useCreateIndex', true);
      await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
      console.log('Database connection successful');
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  initRouters() {
    this.server.use('/api/comments', commentRouter);
  }

  initGlobalError() {
    this.server.use((err, req, res, next) => {
      const message = 'Oooops something went wrong. Try again later.';
      err.message = message;
      res.status(500).send(err);
    });
  }
  startListening() {
    this.server.listen(process.env.PORT, () => {
      console.log('start listening on port', process.env.PORT);
    });
  }
}

new Server().start();
