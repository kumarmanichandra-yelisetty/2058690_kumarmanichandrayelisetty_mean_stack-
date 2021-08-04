function myClear() {
	document.getElementById('clientname').value = '';
	document.getElementById('projectname').value = '';
	document.getElementById('budget').value = '';
}

if (sessionStorage.getItem('key') == undefined) {
	var objArray = [];
	var objJsonArrayString = JSON.stringify(objArray);
	sessionStorage.setItem('key', objJsonArrayString);
}

function storeData() {
	var cn = document.getElementById('clientname').value;
	var pn = document.getElementById('projectname').value;
	var bud = document.getElementById('budget').value;
	let project_details = { clientName: cn, projectName: pn, budget: bud };
	objJsonArrayString = sessionStorage.getItem('key');
	objArray = JSON.parse(objJsonArrayString);
	objArray.push(project_details);
	objJsonArrayString = JSON.stringify(objArray);
	sessionStorage.setItem('key', objJsonArrayString);
}

function displayData() {
	objJsonArrayString = sessionStorage.getItem('key');
	objArray = JSON.parse(objJsonArrayString);
	let tableContents = '';
	let startTable =
		'<table border=1><tr><th>Client Name</th><th>Project Name</th><th>Budget</th></tr>';
	let endTable = '</table>';
	for (let i = 0; i < objArray.length; i++) {
		tableContents +=
			'<tr><td>' +
			objArray[i].clientName +
			'</td><td>' +
			objArray[i].projectName +
			'</td><td>$' +
			objArray[i].budget +
			'</td></tr>';
	}
	tableContents = startTable + tableContents + endTable;
	document.getElementById('main').innerHTML = tableContents;
}
