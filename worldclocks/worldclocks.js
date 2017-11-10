var ddlCities = document.getElementById('ddlCities');
ddlCities.addEventListener('change', ddlCities_onchange);
var myVar = setInterval(myTimer, 1000);
var table = document.getElementById("tableCities");
document.cookie = "country=Malaysia";

$(function () {
    var option = document.createElement("option");
    option.text = "India";
    option.value = "India";
    ddlCities.add(option);
});

function ddlCities_onchange(e) {
    setCookie(ddlCities.options[ddlCities.selectedIndex].value);
}

function setCookie(country) {
    var decodedCookie = decodeURIComponent(document.cookie);
    //if (decodedCookie.length = 0)
        
    //else 
    if (decodedCookie.indexOf(country) == -1)
        document.cookie = decodedCookie + "," + country;
}

function myTimer() {
    //for (var i = 0, row; row = table.rows[i]; i++) {
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
        cell2.innerHTML = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
    }
}
