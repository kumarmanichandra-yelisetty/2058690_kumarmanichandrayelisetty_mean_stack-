var i = 0;
var blogContent = '';

function addBlog() {
	let skeleton1 =
		'<div class="card" style="width: 18rem;"><img class="card-img-top" src="';
	let skeleton2 =
		'" alt="Card image cap"><div class="card-body"><h5 class="card-title">';
	let skeleton3 = '</h5><p class="card-text">';
	let skeleton4 = '</p></div></div>';

	let imgUrl = document.getElementById('image').value;
	let title = document.getElementById('title').value;
	let text = document.getElementById('articles').value;

	let blog =
		skeleton1 + imgUrl + skeleton2 + title + skeleton3 + text + skeleton4;

	let a1 = '<div class="row"><div class="col-4">';
	let a2 = '<div class="col-4">';
	let end_div = '</div>';

	let append;

	if (i == 0) {
		append = a1 + blog + end_div;
	} else if (i == 1) {
		append = a2 + blog + end_div;
	} else {
		append = a2 + blog + end_div + end_div + '<br><br>';
		i = -1;
	}

	blogContent += append;

	document.getElementById('blogsid').innerHTML = blogContent;
	i++;
}
