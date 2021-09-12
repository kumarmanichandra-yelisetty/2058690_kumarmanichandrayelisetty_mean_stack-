let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let url = 'mongodb://localhost:27017/Courses';
mongoose.pluralize(null);
let courseSchema = mongoose.Schema({
	_id: Number,
	cid: Number,
	cname: String,
	desc: String,
	amount: Number,
});
let courseModel = mongoose.model('Course', courseSchema);

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var idArray = new Array();

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/addCourse.html', (req, res) => {
	res.sendFile(__dirname + '/addCourse.html');
});

app.get('/updateCourse.html', (req, res) => {
	res.sendFile(__dirname + '/updateCourse.html');
});

app.get('/deleteCourse.html', (req, res) => {
	res.sendFile(__dirname + '/deleteCourse.html');
});

app.get('/fetchCourse.html', (req, res) => {
	let data = new Array();
	mongoose
		.connect(url)
		.then((res) => console.log('connected'))
		.catch((err) => console.log(err));
	let db = mongoose.connection;
	db.once('open', () => {
		courseModel.find({}, (err, result) => {
			if (!err) {
				let tempTable = `
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">;
 
                <table class="table table-striped"><thead><tr><th scope="col">Course ID</th><th scope="col">Course Name</th><th scope="col">Description</th><th scope="col">Amount</th></tr></thead><tbody>`;

				result.forEach((c) => {
					tempTable += `
                    <tr>
                        <td>${c.cid}</td>
                        <td>${c.cname}</td>
                        <td>${c.desc}</td>
                        <td>${c.amount}</td>
                    </tr>
                    `;
				});
				tempTable += `
                </tbody></table>
                <br/> <br/>
                <a href="/">Back</a>
                `;
				res.send(tempTable);
			} else {
				console.log(err);
			}
			mongoose.disconnect();
		});
	});
});

app.get('/addCourse', (res, req) => {
	let cid = req.req.query.cid;
	let cname = req.req.query.cname;
	let desc = req.req.query.desc;
	let amount = req.req.query.amount;
	let exists = false;
	for (let i = 0; i < idArray.length; ++i) {
		if (cid == idArray[i]) {
			exists = true;
			break;
		}
	}
	if (exists) {
		console.log('Course with ID' + cid + ' already exists! Try again.');
	} else {
		mongoose
			.connect(url)
			.then((res) => console.log('connected'))
			.catch((err) => console.log(err));
		let db = mongoose.connection;
		db.once('open', () => {
			let tempJson = JSON.parse(
				'{"_id":' +
					cid +
					', "cid":' +
					cid +
					', "cname": "' +
					cname +
					'", "desc":"' +
					desc +
					'", "amount":' +
					amount +
					'}'
			);
			//console.log(tempJson)
			courseModel.insertMany([tempJson], (err, result) => {
				if (!err) {
					console.log('Successfully added new course ID: ' + cid);
				} else {
					console.log(
						'Failed to add course! Please use a UNIQUE course ID.'
					);
				}
				mongoose.disconnect();
			});
		});
		idArray.push(cid);
	}
	res.res.sendFile(__dirname + '/addCourse.html');
});

app.get('/updateCourse', (res, req) => {
	let cid = req.req.query.cid;
	let newAmount = req.req.query.amount;
	mongoose
		.connect(url)
		.then((res) => console.log('connected'))
		.catch((err) => console.log(err));
	let db = mongoose.connection;
	db.once('open', () => {
		let tempJson = JSON.parse('{"_id":' + cid + '}');
		//console.log(tempJson)
		courseModel.updateOne(
			tempJson,
			{ $set: { amount: newAmount } },
			(err, result) => {
				if (!err) {
					console.log(
						'Successfully updated course ID: ' +
							cid +
							' to new amount:' +
							newAmount
					);
				} else {
					console.log(err);
				}
				mongoose.disconnect();
			}
		);
	});
	res.res.sendFile(__dirname + '/updateCourse.html');
});

app.get('/deleteCourse', (res, req) => {
	let dcid = req.req.query.cid;
	mongoose
		.connect(url)
		.then((res) => console.log('connected'))
		.catch((err) => console.log(err));
	let db = mongoose.connection;
	db.once('open', () => {
		let tempJson = JSON.parse('{"cid":' + dcid + '}');
		//console.log(tempJson)
		courseModel.deleteMany(tempJson, (err, result) => {
			if (!err) {
				console.log(
					'Successfully deleted course ' +
						dcid +
						' from the database. (Did not do any error checking)'
				);
			} else {
				console.log(err);
			}
			mongoose.disconnect();
		});
	});
	res.res.sendFile(__dirname + '/deleteCourse.html');
});

app.listen(9090, () =>
	console.log('Server running on --> http://localhost:9090/')
);
