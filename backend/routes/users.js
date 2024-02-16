var express = require('express');
var router = express.Router();
const connection = require('../lib/connect.js')

/* GET users listing. */
router.get('/', function(req, res, ) {

  connection.connect((err) => {
    if (err) console.log('err', err);

    let query = "SELECT * FROM users"

    connection.query(query, (err, data) => {
      if (err) console.log('err', err);

      console.log('users', data);;
      res.json(data)
    })
  })
});

router.post('/add', function(req, res, ) {

  let userId = req.body.userId
  let userName = req.body.userName
  let userEmail = req.body.userEmail
  let password = req.body.password

  connection.connect((err) => {
    if (err) console.log('err', err);

    let query = "INSERT into users (userId, userName, userEmail, password) VALUES (?,?,?,?)"
    let values = [userId, userName, userEmail,password]

    connection.query(query,values, (err, data) => {
      if (err) console.log('err', err);

      console.log('users', data);;
      res.json({data})
    })
  })
});

module.exports = router;
