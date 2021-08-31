let http = require('http');
let url = require('url');
let fs = require('fs');
let allTasks = new Array();
if (fs.existsSync('tasks.json')) {
	allTasks = JSON.parse(fs.readFileSync('tasks.json').toString());
}

let indexPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <title>Document</title>
</head>
<body class="container bg-light text-black">
    <h2><u>Task Planner</u></h2>
    <br/> <br/>
    <h2><u>Add Task:</u></h2>
    <form action="addTask">
        <label>Employee ID: </label>
        <input type="text" name="eid"/><br/><br/>
        <label>Task ID: </label>
        <input type="text" name="tid"/><br/><br/>
        <label>Task Name: </label>
        <input type="text" name="task"/><br/><br/>
        <label>Deadline: </label>
        <input type="text" name="deadline"/><br/><br/>
        <input type="submit" value="Add Task"/>
    </form>
    <br/> <br/>
    <h2><u>Delete Task:</u></h2>
    <form action="deleteTask">
        <label>Task ID: </label>
        <input type="text" name="tid"/><br/><br/>
        <input type="submit" value="Delete Task"/>
    </form>
    <br/> <br/>
    <h2><u>List Task:</u></h2>
    <form action="listTask">
        <input type="submit" value="List All Task"/>
    </form>
    <br/><br/>
</body>
</html> 
`;

function addTask(userInput) {
	let eid = userInput.eid;
	let tid = userInput.tid;
	let task = userInput.task;
	let deadline = userInput.deadline;
	let tempString =
		'{"eid": "' +
		eid +
		'", "tid": "' +
		tid +
		'", "task": "' +
		task +
		'", ' +
		'"deadline": "' +
		deadline +
		'"}';
	allTasks.push(JSON.parse(tempString));
	fs.writeFileSync('tasks.json', JSON.stringify(allTasks));
	console.log('Successfully logged: ' + tempString);
}

function deleteTask(result) {
	for (let i = 0; i < allTasks.length; ++i) {
		if (allTasks[i] == result) {
			allTasks.splice(i, 1);
		}
	}
	fs.writeFileSync('tasks.json', JSON.stringify(allTasks));
}

let server = http.createServer((request, response) => {
	let urlInfo = url.parse(request.url, true);
	if (urlInfo.path != '/favicon.ico') {
		if (urlInfo.pathname == '/addTask') {
			let userInput = urlInfo.query;
			let result = allTasks.find((t) => t.tid == userInput.tid);
			response.writeHead(200, { 'content-type': 'text/html' });
			if (result != undefined) {
				response.write(
					'Failure: Task with ID ' +
						userInput.tid +
						' already exists!'
				);
				response.write(indexPage);
			} else {
				addTask(userInput);
				response.write('Task created successfully!');
				response.write(indexPage);
			}
		} else if (urlInfo.pathname == '/deleteTask') {
			let userInput = urlInfo.query;
			let result = allTasks.find((t) => t.tid == userInput.tid);
			response.writeHead(200, { 'content-type': 'text/html' });
			if (result != undefined) {
				deleteTask(result);
				response.write(
					'Task ID ' + userInput.tid + ' was successfully deleted!'
				);
				response.write(indexPage);
			} else {
				response.write('Task ID ' + userInput.tid + ' does NOT exist!');
				response.write(indexPage);
			}
		} else if (urlInfo.pathname == '/listTask') {
			response.writeHead(200, { 'content-type': 'text/html' });
			if (allTasks.length > 0) {
				let listPage = `<table class="table table-striped"><thead><tr><th scope="col">Emp ID</th><th scope="col">Task ID</th><th scope="col">Task</th><th scope="col">Deadline</th></tr></thead><tbody>`;

				allTasks.forEach((t) => {
					listPage += `
                    <tr>
                        <td>${t.eid}</td>
                        <td>${t.tid}</td>
                        <td>${t.task}</td>
                        <td>${t.deadline}</td>
                    </tr>
                    `;
				});
				listPage += `
                </tbody></table><br><br><br>
                `;
				response.write(indexPage);
				response.write(listPage);
			} else {
				response.write(indexPage);
				response.write('There are no tasks!');
			}
		} else {
			response.write(indexPage);
		}
	}
	response.end();
});
server.listen(9090, () =>
	console.log('Server running on http://localhost:9090/')
);
