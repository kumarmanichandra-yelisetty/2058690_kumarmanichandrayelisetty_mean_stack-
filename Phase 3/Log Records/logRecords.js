let fs = require('fs');
let readline = require('readline-sync');

function getInput() {
	debugger;
	let fname = readline.question('Enter first name: ');
	let lname = readline.question('Enter last name: ');
	let gender = readline.question('Enter gender: ');
	let email = readline.question('Enter email: ');
	let dateNow = Date().toLocaleString();
	let tempString =
		'{"fname": "' +
		fname +
		'", "lname": "' +
		lname +
		'", "gender": "' +
		gender +
		'", ' +
		'"email": "' +
		email +
		'", "dateNow": "' +
		dateNow +
		'"}';
	debugger;
	let tempJson = new Array();
	if (fs.existsSync('log-records.json')) {
		tempJson = JSON.parse(fs.readFileSync('log-records.json').toString());
	}
	debugger;
	tempJson.push(JSON.parse(tempString));
	fs.writeFileSync('log-records.json', JSON.stringify(tempJson));
	debugger;
	console.log('Successfully logged: ' + tempString);
}

var response = 'y';
while (response == 'y') {
	getInput();
	response = readline.question('Do you want to add more? (y/n)');
}
