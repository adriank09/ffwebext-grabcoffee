var ddlCities = document.getElementById('ddlCities');
ddlCities.addEventListener('change', ddlCities_onchange);
var myVar = setInterval(myTimer, 1000);
var table = document.getElementById("tableCities");
document.cookie = "country=Malaysia";

//var states = new Array();
//states['Canada'] = new Array('Alberta', 'British Columbia', 'Ontario');
//states['Mexico'] = new Array('Baja California', 'Chihuahua', 'Jalisco');
//states['United States'] = new Array('California', 'Florida', 'New York');


//var cities = new Array();
//cities['Canada'] = new Array();
//cities['Canada']['Alberta'] = new Array('Edmonton', 'Calgary');
//cities['Canada']['British Columbia'] = new Array('Victoria', 'Vancouver');
//cities['Canada']['Ontario'] = new Array('Toronto', 'Hamilton');
//cities['Mexico'] = new Array();
//cities['Mexico']['Baja California'] = new Array('Tijauna', 'Mexicali');
//cities['Mexico']['Chihuahua'] = new Array('Ciudad Ju¨¢rez', 'Chihuahua');
//cities['Mexico']['Jalisco'] = new Array('Guadalajara', 'Chapala');
//cities['United States'] = new Array();
//cities['United States']['California'] = new Array('Los Angeles', 'San Francisco');
//cities['United States']['Florida'] = new Array('Miami', 'Orlando');
//cities['United States']['New York'] = new Array('Buffalo', 'new York');

//function addLoadEvent(func) {
//    var oldonload = window.onload;
//    if (typeof window.onload != 'function') {
//        window.onload = func;
//    } else {
//        window.onload = function () {
//            if (oldonload) {
//                oldonload();
//            }
//            func();
//        }
//    }
//}

//addLoadEvent(function () {
//    setCities();
//});

//function setCities() {
//    cntrySel = document.getElementById('country');
//    stateSel = document.getElementById('state');
//    cityList = cities[cntrySel.value][stateSel.value];
//    changeSelect('city', cityList, cityList);
//}

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
