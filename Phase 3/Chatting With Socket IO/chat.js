let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let resArray = [
	'Hello, I am the Server.',
	'Please tell me how can i help you...',
	"Sorry I don't understand you.",
	'Ok regarding this query i am not capable to help, please contact 9999999999 for further help...',
	'Do you have any other questions?',
	'Please rate me for my service.',
	'Please stop I am overloaded already with other request, please contact help-desk as i mentioned above...',
];
let resIndex = 0;
let stopMsg = 'Error, server overloaded';

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	console.log('Client connected');
	socket.on('obj', (msg) => {
		console.log('From client: ' + msg);
		if (resIndex <= 6) {
			socket.emit('obj1', resArray[resIndex]);
			++resIndex;
		} else {
			socket.emit('obj1', stopMsg);
			stopMsg += '!';
		}
	});
});

http.listen(9090, () =>
	console.log('Server running on: http://localhost:9090/')
);
