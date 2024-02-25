var express = require('express');
var router = express.Router();
const connection = require('../lib/connect.js');

router.get('/all/:userId', async function (req, res) {
	try {
		let userId = req.params.userId;
		let query = 'SELECT * FROM documents WHERE userId = ? AND isDeleted = 0';
		connection.query(query, [userId], async (err, data) => {
			if (err) {
				console.log('err', err);
				return res.status(401).json({ message: 'Something went wrong' });
			}

			if (data.length < 1) {
				return res.status(404).json({ message: 'No user documents1' });
			} else {
				console.log('UserDocs', data);
				res.status(200).json(data);
			}
		});
	} catch (error) {
		console.log('ERROR', error);
		res.status(500).json({ error: 'Something went wrong, please try again' });
	}
});

router.post('/add', function (req, res) {
	console.log('post');
	try {
		let userId = req.body.userId;
		let title = req.body.title;
		let documentBody = req.body.documentBody;

		connection.connect((err) => {
			if (err) console.log('err', err);
			let query =
				'INSERT into documents (userId, title, documentBody) VALUES (?,?,?)';
			let values = [userId, title, documentBody];

			connection.query(query, values, (err, data) => {
				console.log(err);
				if (err) {
					return res.status(401).json({
						message: 'failed to save document1',
					});
				}
				console.log('Successfully stored doc', data);
				res.status(200).json({ data });
			});
		});
	} catch (error) {
		console.log('ERROR', error);
		res.status(500).json({ error: 'something went wrong' });
	}
});

router.post('/getdoc/:documentId', async function (req, res) {
	try {
		let documentId = req.params.documentId;
		let userId = req.body.userId;

		let query = 'SELECT * FROM documents WHERE documentId = ? AND userId = ?';
		let values = [documentId, userId];

		connection.query(query, values, async (err, data) => {
			if (err) {
				console.log('err', err);
				return res.status(401).json({ message: 'Something went wrong' });
			}

			if (data.length < 1) {
				return res.status(404).json({ message: 'Document not found' });
			} else {
				console.log('UserDocs', data[0].title);
				res.status(200).json({ data });
			}
		});
	} catch (error) {
		console.log('ERROR', error);
		res.status(500).json({ error: 'Something went wrong, please try again' });
	}
});

router.put('/update/:documentId', async function (req, res) {
	try {
		let documentId = req.params.documentId;
		let title = req.body.title;
		let documentBody = req.body.documentBody;
		let userId = req.body.userId;
		let query =
			'UPDATE documents SET title = ?, documentBody = ?, lastUpdated = CURRENT_TIMESTAMP WHERE documentId = ? AND userId = ?';
		let values = [title, documentBody, documentId, userId];
		connection.query(query, values, async (err, data) => {
			if (err) {
				console.log('err', err);
				return res.status(401).json({ message: 'Error' });
			}
			console.log(data[0]);
			res.status(200).json({ message: 'Document updated' });
		});
	} catch (error) {
		console.log('ERROR', error);
		res.status(500).json({ error: 'Something went wrong, please try again' });
	}
});

router.delete('/delete/:documentId', async function (req, res) {
	try {
		connection.connect((err) => {
			if (err) console.log('err', err);

			let userId = req.body.userId;
			let documentId = req.params.documentId;
			let checkDoc =
				'SELECT isDeleted FROM documents WHERE userId = ? AND documentId = ?';
			let values = [userId, documentId];

			connection.query(checkDoc, values, async (err, data) => {
				if (err) {
					console.log('err', err);
					return res.status(500).json({ message: 'Something went wrong' });
				}
				// let query
				let isDeleted = data[0].isDeleted;
				if (isDeleted === 1) {
					checkDoc =
						'UPDATE documents SET isDeleted = 0 WHERE userId = ? AND documentId = ?';
				} else if (isDeleted === 0) {
					checkDoc =
						'UPDATE documents SET isDeleted = 1 WHERE userId = ? AND documentId = ?';
				}

				connection.query(checkDoc, values, async (err, data) => {
					console.log(err);
					if (err) {
						console.log('err', err);
						return res.status(401).json({ message: 'Something went wrong1' });
					}

					if (data.length < 1) {
						return res.status(404).json({ message: 'No user documents1' });
					} else {
						console.log('Document deleted', data);
						res.status(200).json(data);
					}
				});
			});
		});
	} catch (error) {
		console.log('ERROR', error);
		res.status(500).json({ error: 'Something went wrong, please try again' });
	}
});

module.exports = router;
