
if (location.search !== "?foo") {
	location.search = "?foo";
	throw new Error;
}

onload = function () {
	document.getElementById("so_search").focus();
}
function search_stackoverflow(query) {
	browser.tabs.create({ 'url': "http://stackoverflow.com/search?q=" + encodeURIComponent(query) });
}
function check_query(e) {
	query = document.getElementById("so_search").value;
	if (query == '')
		return;
	if (e && e.which) {
		c = e.which;
	} else {
		c = event.keyCode;
	}
	if (c == 13 && query != '') {
		search_stackoverflow(query);
	}
}

document.getElementById("search_button").addEventListener("click", check_query_button);

function check_query_button() {
	query = document.getElementById("so_search").value;
	if (query != '')
		search_stackoverflow(query);
}

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById("so_search").addEventListener('keypress', check_query);
});