var ddlCities = document.getElementById('ddlCities');
ddlCities.addEventListener('change', ddlCities_onchange);
var myVar = setInterval(myTimer, 1000);
var table = document.getElementById("tableCities");
document.cookie = "country=Malaysia";

window.onload = function () {
    var option = document.createElement('option');
    option.text = option.value = "New York";
    ddlCities.add(option, 0);
    option.text = option.value = "Kuala Lumpur";
    ddlCities.add(option, 1);
    option.text = option.value = "London";
    ddlCities.add(option, 2);
};

function ddlCities_onchange(e) {
    setCookie(ddlCities.options[ddlCities.selectedIndex].value);
}

function setCookie(country) {
    var decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie.indexOf(country) == -1)
        document.cookie = decodedCookie + "," + country;
}

function myTimer() {
    table.innerHTML = "";
    var name = "country=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(',');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            c = c.substring(name.length, c.length);
        }
        cell1.innerHTML = c;

        var d = new Date();
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var nd = new Date(utc + (3600000 * getUTCOffset()));
        cell2.innerHTML = nd.toLocaleString();
    }
}

function getUTCOffset() {
    return '+8';
}
