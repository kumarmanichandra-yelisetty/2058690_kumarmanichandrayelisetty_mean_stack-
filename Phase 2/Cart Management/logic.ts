function addProduct(item:string, price:string) {
	var quantity = 0;
	if (sessionStorage.length > 0) {
		for (var i = 0; i < sessionStorage.length; ++i) {
			var tempJson = JSON.parse(
				sessionStorage.getItem(sessionStorage.key(i))
			);
			if (tempJson.item == String(item)) {
				quantity = tempJson.quantity;
			}
		}
	}
	++quantity;
	var tempString =
		'{"item": "' +
		item.toString() +
		'", "price": "' +
		price.toString() +
		'", "quantity": "' +
		quantity.toString() +
		'"}';
	sessionStorage.setItem(String(item), tempString);
	updateCartValue();
}

function updateCartValue() {
	try {
		var cartTotal = 0;
		for (var i = 0; i < sessionStorage.length; ++i) {
			if (
				sessionStorage.key(i) != 'IsThisFirstTime_Log_From_LiveServer'
			) {
				var tempJson = JSON.parse(
					sessionStorage.getItem(sessionStorage.key(i))
				);
				//console.log(sessionStorage.key(i));
				cartTotal += parseInt(tempJson.quantity);
			}
		}
		document.getElementById('cartCount').innerHTML = String(cartTotal);
	} catch (err) {
		console.log('Exception error');
	}
}

function displayData() {
	let tableContents = '';
	let startTable =
		'<table class="table table-striped"><thead><tr><th scope="col">Item Name</th><th scope="col">Price</th><th scope="col">Quantity</th></tr></thead><tbody>';
	let endTable = '</tbody></table><br><br><br>';
	var totalCost = 0;
	for (var i = 0; i < sessionStorage.length; ++i) {
		if (sessionStorage.key(i) != 'IsThisFirstTime_Log_From_LiveServer') {
			var tempJson = JSON.parse(
				sessionStorage.getItem(sessionStorage.key(i))
			);
			tableContents +=
				'<tr><td>' +
				tempJson.item +
				'</td><td>$' +
				tempJson.price +
				'</td><td>' +
				tempJson.quantity +
				'</td></tr>';
			totalCost += Number(tempJson.price * tempJson.quantity);
		}
	}

	tableContents =
		startTable +
		tableContents +
		endTable +
		'Total Cost:  $' +
		totalCost.toFixed(2);
	document.getElementById('main').innerHTML = tableContents;
}
