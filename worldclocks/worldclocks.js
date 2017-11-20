var lblUTC = document.getElementById('lblUTC');
var lblLocal = document.getElementById('lblLocal');
var ddlCities = document.getElementById('ddlCities');
ddlCities.addEventListener('change', ddlCities_onchange);
var myVar = setInterval(myTimer, 1000);
var tableCities = document.getElementById("tableCities");
var cities = ["Accra", "Addis Ababa", "Adelaide", "Algiers", "Almaty", "Amman", "Amsterdam", "Anadyr", "Anchorage", "Ankara", "Antananarivo", "Asuncion", "Athens", "Atlanta", "Auckland", "Baghdad ", "Bangalore", "Bangkok ", "Barcelona", "Beijing", "Beirut", "Belgrade", "Berlin", "Bogota", "Boston", "Brasilia", "Brisbane", "Brussels", "Bucharest", "Budapest", "Buenos Aires", "Cairo", "Calgary", "Canberra", "Cape Town", "Caracas", "Casablanca", "Chicago", "Copenhagen", "Dallas", "Dar es Salaam", "Darwin", "Denver", "Detroit", "Dhaka", "Doha", "Dubai", "Dublin", "Edmonton", "Frankfurt", "Guatemala City", "Halifax", "Hanoi", "Harare", "Havana", "Helsinki", "Hong Kong", "Honolulu", "Houston", "Indianapolis", "Islamabad", "Istanbul", "Jakarta", "Jerusalem", "Johannesburg", "Kabul", "Karachi", "Kathmandu", "Khartoum", "Kingston", "Kinshasa", "Kiritimati", "Kolkata", "Kuala Lumpur", "Kuwait City", "Kyiv", "La Paz", "Lagos", "Lahore", "Las Vegas", "Lima", "Lisbon", "London", "Los Angeles", "Madrid", "Managua", "Manila", "Melbourne", "Mexico City", "Miami", "Minneapolis", "Minsk", "Montevideo", "Montréal", "Moscow", "Mumbai", "Nairobi", "Nassau", "New Delhi", "New Orleans", "New York", "Oslo", "Ottawa", "Paris", "Perth", "Philadelphia", "Phoenix", "Prague", "Reykjavik", "Rio de Janeiro", "Riyadh", "Rome", "Salt Lake City", "San Francisco", "San Juan", "San Salvador", "Santiago", "Santo Domingo", "São Paulo", "Seattle", "Seoul", "Shanghai", "Singapore", "Sofia", "St. Johns", "Stockholm", "Suva", "Sydney", "Taipei", "Tallinn", "Tashkent", "Tegucigalpa", "Tehran", "Tokyo", "Toronto", "Vancouver", "Vienna", "Warsaw", "Washington DC", "Winnipeg", "Yangon", "Zagreb", "Zürich"];
var citiesOffset = ["0", "+3", "+10.5", "+1", "+6", "+2", "+1", "+12", "-9", "+3", "+3", "-3", "+2", "-5", "+13", "+3 ", "+5.5", "+7 ", "+1", "+8", "+2", "+1", "+1", "-5", "-5", "-2", "+10", "+1", "+2", "+1", "-3", "+2", "-7", "+11", "+2", "-4", "0", "-6", "+1", "-6", "+3", "+9.5", "-7", "-5", "+6", "+3", "+4", "0", "-7", "+1", "-6", "-4", "+7", "+2", "-5", "+2", "+8", "-10", "-6", "-5", "+5", "+3", "+7", "+2", "+2", "+4.5", "+5", "+5.5", "+2", "-5", "+1", "+14", "+5.5", "+8", "+3", "+2", "-4", "+1", "+5", "-8", "-5", "0", "0", "-8", "+1", "-6", "+8", "+11", "-6", "-5", "-6", "+3", "-3", "-5", "+3", "+5.5", "+3", "-5", "+5.5", "-6", "-5", "+1", "-5", "+1", "+8", "-5", "-7", "+1", "0", "-2", "+3", "+1", "-7", "-8", "-4", "-6", "-3", "-4", "-2", "-8", "+9", "+8", "+8", "+2", "-3", "+1", "+13", "+11", "+8", "+2", "+5", "-6", "+3.5", "+9", "-5", "-8", "+1", "+1", "-5", "-6", "+7", "+1", "+1"];
var selectedCities = [];

window.onload = function () {
    cities.forEach(function (city) {
        ddlCities.appendChild(new Option(city, city));
    })
    myTimer();
};

function ddlCities_onchange(e) {
    if (selectedCities.indexOf(ddlCities.options[ddlCities.selectedIndex].value) == -1)
        selectedCities.push(ddlCities.options[ddlCities.selectedIndex].value)
}

function myTimer() {
    tableCities.innerHTML = "";
    var date = new Date();
    var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    lblLocal.innerText = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    lblUTC.innerText = new Date(utc).toLocaleDateString() + " " + new Date(utc).toLocaleTimeString();
    for (i = 0; i < selectedCities.length; i++) {
        var row = tableCities.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = selectedCities[i];
        var newdate = new Date(utc + (3600000 * getUTCOffset(selectedCities[i])));
        cell2.innerHTML = newdate.toLocaleDateString() + " " + newdate.toLocaleTimeString();     
        var btnDelete = document.createElement("button");
        btnDelete.innerHTML = "Delete";
        btnDelete.className = "btn";
        btnDelete.onclick = deleteRow.bind(this, i);
        cell3.appendChild(btnDelete);
    }
}

function getUTCOffset(city) {
    return citiesOffset[cities.indexOf(city)];
}

function deleteRow(row) {
    var index = selectedCities.indexOf(tableCities.rows[row].cells[0].innerHTML);
    selectedCities.splice(index, 1);
}