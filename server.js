// imports
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const configureRoutes = require('./config/routes');


const corsOptions = {
  // If you're moving onto the stretch problem you'll need to set this obj with the appropriate fields
  // ensure that your client's URL/Port can achieve a Handshake
  // then pass this object to the cors() function
};

// server + middleware
const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger('dev'));

// routes
configureRoutes(server);
server.get('/', (req, res) => res.send({API: 'live'}));

module.exports = {server};
