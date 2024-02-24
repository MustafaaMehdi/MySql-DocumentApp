var express = require('express');
var router = express.Router();
const connection = require('../lib/connect.js');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

/* GET users listing. */
router.get('/', function (req, res) {
	try {
		connection.connect((err) => {
			if (err) console.log('err', err);

			let query = 'SELECT * FROM users';

			connection.query(query, (err, data) => {
				if (err) console.log('err', err);

				console.log('users', data);
				const userId = data.map((user) => user.userId);
				res.status(200).json({ userId });
			});
		});
	} catch (error) {
		console.log('ERROR', error);
		res.status(500).json({ error: 'something went wrong' });
	}
});

router.get('/profile/:userId', function (req, res) {
	try {
		let userId = req.params.userId
		let query = 'SELECT userName, userEmail FROM users WHERE userId = ?';

		connection.query(query, [userId], (err, data) => {
			if (err) {
				console.log('err', err);
				return res.status(500).json({ message: 'Login failed' });
			}

			if (data.length < 1) {
				return res.status(404).json({ message: 'User does not exist' });
			} else {

					console.log('Login successful!', data[0]);
					res
						.status(200)
						.json({
							name: data[0].userName,
							email: data[0].userEmail,
							id: data[0].userId,
						});

			}
		});
	} catch (error) {
		console.log('ERROR', error);
		res.status(500).json({ error: 'Something went wrong, please try again' });
	}
});

router.post('/add', async function (req, res) {
	try {
		let uuid = crypto.randomUUID();
		const cryptedPass = await bcrypt.hash(req.body.password, 10);

		let userId = uuid;
		let userName = req.body.userName;
		let userEmail = req.body.userEmail;
		let password = cryptedPass;

		connection.connect((err) => {
			if (err) console.log('err', err);
			let checkExisting = 'SELECT * FROM users WHERE userEmail = ?';
			let query =
				'INSERT into users (userId, userName, userEmail, password) VALUES (?,?,?,?)';

			let values = [userId, userName, userEmail, password];

			connection.query(checkExisting, [userEmail], (err, data) => {
				if (err) {
					return res.status(401).json({
						message: 'Sign-up failed',
					});
				}
				if (data.length > 0) {
					return res
						.status(409)
						.json({ message: 'E-mail address already exists' });
				} else {
					connection.query(query, values, (err, data) => {
						if (err) {
							return res.status(401).json({
								message: 'Sign-up failed',
							});
						}
						console.log('Sign-up successful!', {userName});
						res.status(200).json({userName});
					});
				}
			});
		});
	} catch (error) {
		console.log('ERROR', error);
		res.status(500).json({ error: 'something went wrong' });
	}
});

router.post('/login', async function (req, res) {
	try {
		let userEmail = req.body.userEmail;
		let password = req.body.password;

		let query = 'SELECT * FROM users WHERE userEmail = ?';

		connection.query(query, [userEmail], async (err, data) => {
			if (err) {
				console.log('err', err);
				return res.status(500).json({ message: 'Login failed' });
			}

			if (data.length < 1) {
				return res.status(404).json({ message: 'User does not exist' });
			} else {
				let storedPass = data[0].password;
				const comparePass = await bcrypt.compare(password, storedPass);

				if (comparePass) {
					res
						.status(200)
						.json({
							name: data[0].userName,
							email: data[0].userEmail,
							id: data[0].userId,
						});
				} else {
					console.log('Incorrect E-mail or password');
					res.status(401).json({ message: 'Incorrect E-mail or password' });
				}
			}
		});
	} catch (error) {
		console.log('ERROR', error);
		res.status(500).json({ error: 'Something went wrong, please try again' });
	}
});

router.patch('/updateprofile/:userId', async function (req, res) {
	try {
		let userId = req.params.userId;
		let userName = req.body.userName;
		let query =
			'UPDATE users SET userName = ? WHERE userId = ?';
		let values = [userName, userId];
		connection.query(query, values, async (err, data) => {
			if (err) {
				console.log('err', err);
				return res.status(401).json({ message: 'Error' });
			}
			res.status(200).json({ message: 'Information updated successfully' });
		});
	} catch (error) {
		console.log('ERROR', error);
		res.status(500).json({ error: 'Something went wrong, please try again' });
	}
});

router.patch('/editpass/:userId', async function (req, res) {
    try {
        let userId = req.params.userId;
        let checkExisting = 'SELECT password FROM users WHERE userId = ?';
        connection.query(checkExisting, [userId], async (err, data) => {
            if (err) {
                console.log('Error checking existing password:', err);
                return res.status(500).json({ error: 'Something went wrong, please try again' });
            }
            if (data.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            const currentPassword = data[0].password;
            const isCurrentPassword = await bcrypt.compare(req.body.currentPassword, currentPassword);

            if (!isCurrentPassword) {
                return res.status(401).json({ message: 'Current password is incorrect' });
            }
            const newPassword = await bcrypt.hash(req.body.newPassword, 10);
            let updatePasswordQuery = 'UPDATE users SET password = ? WHERE userId = ?';
            connection.query(updatePasswordQuery, [newPassword, userId], (err, updateData) => {
                if (err) {
                    console.log('Error updating password:', err);
                    return res.status(500).json({ error: 'Something went wrong, please try again' });
                }
                res.status(200).json({ message: 'Password updated successfully' });
            });
        });
    } catch (error) {
        console.log('ERROR', error);
        res.status(500).json({ error: 'Something went wrong, please try again' });
    }
});


module.exports = router;
