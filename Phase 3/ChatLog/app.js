let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let fs = require('fs');

let mongoose = require('mongoose');
let url = 'mongodb://localhost:27017/Chatlog';
mongoose.pluralize(null);
let chatSchema = mongoose.Schema({
	_id: Number,
	name: String,
	message: String,
});
let chatModel = mongoose.model('Chat', chatSchema);
let db = mongoose.connection;

var currInc;
if (fs.existsSync('chatIncrement.txt')) {
	currInc = Number(fs.readFileSync('chatIncrement.txt'));
} else {
	fs.writeFileSync('chatIncrement.txt', '0');
}

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	console.log('Client connected');
	socket.on('obj', function (msg) {
		mongoose
			.connect(url)
			.then((res) => console.log('Opening mongodb'))
			.catch((err) => console.log(err));
		db.once('open', () => {
			if (currInc == undefined) {
				currInc = 0;
			}
			let tempJson = JSON.parse(
				'{"_id":' +
					currInc +
					', "name": "' +
					msg.name +
					'", "message":"' +
					msg.message +
					'"}'
			);
			console.log(tempJson);
			chatModel.insertMany([tempJson], (err, result) => {
				if (!err) {
					console.log(
						'Successfully added new chat with id: ' + currInc
					);
					++currInc;
					fs.writeFileSync('chatIncrement.txt', currInc.toString());
				} else {
					console.log('Failed to add chat!');
				}
				mongoose.disconnect();
			});
		});
	});
});

http.listen(9090, () =>
	console.log('Server running on --> http://localhost:9090/')
);
