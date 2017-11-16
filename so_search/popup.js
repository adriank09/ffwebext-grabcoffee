if (location.search !== "?foo") {
	location.search = "?foo";
	throw new Error;
}
onload = function () {
	document.getElementById("so_search").focus();
}

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById("so_search").addEventListener('keypress', enter_click);
	document.getElementById("search_button").addEventListener("click", check_query);
});

function enter_click(e) {
	var key = e.which || e.keyCode;
	if (key == 13 && query != '') {
		// code will continue to run to check_query() function
	} else {
		return;
	}
}

function check_query(e) {
	query = document.getElementById("so_search").value;
	search_stackoverflow(query);
}

function search_stackoverflow(query) {
	chrome.tabs.create({ 'url': "http://stackoverflow.com/search?q=" + encodeURIComponent(query) });
}