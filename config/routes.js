const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');

const { authenticate, generateToken } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 5)
  creds.password = hash;

  db('users')
      .insert(creds)
      .then(ids => {
          res.status(201).json(ids);
      })
      .catch(err => {
          res.send(err);
      })
}

function login(req, res) {
  // implement user login
  const creds = req.body;
  db('users')
      .where({username: creds.username})
      .first()
      .then(user => {
          if (user && bcrypt.compareSync(creds.password, user.password)) {
              const token = generateToken(user);
              res.status(200).json({message: "Logged in", token});
          } else {
              res.status(401).json({message: "You shall not pass!"});
          }
      })
      .catch(err => res.send(err));
}

function getJokes(req, res) {
  axios
    .get(
      'https://safe-falls-22549.herokuapp.com/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

// [BROKEN] Jokes API: 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'