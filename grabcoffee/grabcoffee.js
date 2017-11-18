
/*
    GrabCoffee

    Uses API
    - Foursquare
    - HTML5 Geolocation

*/

// Constant
var foursquare_client_ID = "R1SLWIBY31S4DXJ1CZ3SNZ1VBPMEKQ3DJ5LP5KX0FY3QRVST";
var foursquare_client_secret ="CYENH2FDBSD2BLEEHBLQF2P1QTZKITQSUBLUID2AO5HQRA1M";
var foursquare_area_radius = 1000;
var foursquare_explore_section = "food";
var GOOGLE_API_KEY = "AIzaSyCP2dnL9a8nJUMj1r-tQ-AKu8fyGnIRHdU";
var this_longitude = '';
var this_latitude = '';

var app = document.getElementById('app');

// Event
window.onload = initApp();

// Initialize the webext app
function initApp() {
    
    // get the geolocation component, and pass the owner's location (lat & lang)
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setCoordinate);
    }

}

// Loads the app and render the view
function loadApp(json) {
    // parse it so we can use it later
    var obj = JSON.parse(json);
    // draw the view
    var view = '<div class="panel panel-default"><div class="panel-body"><div class="container">';

    view += '<p>Here are some places to chill in <strong>' + obj.response.headerFullLocation + '</strong>!</p>';
    view += '<hr />';
    
    // item groups
    for(var i = 0; i < obj.response.groups.length; i++) {
        var items = obj.response.groups[i].items;

        for(var j=0; j<items.length; j++) {
            var venue = items[j].venue;
            var tips = items[j].tips;

            var venue_id = venue.id;
            var venue_name = venue.name;
            var venue_contact = venue.contact.formattedPhone == 'undefined' ? venue.contact.formattedPhone : '-';
            var venue_location = venue.location.formattedAddress;
            var venue_categories = categories_stringify(venue.categories);
            var venue_url = venue.url == 'undefined' ? venue.url : '-';
            var venue_rating = venue.rating;
            var venue_randomized_comment = randomize_comment(tips);
            var venue_lat = venue.location.lat;
            var venue_lng = venue.location.lng;

            view += 
            '<div class="row slick"><div class="col-sm-6">'    
                + '<p>Venue name: ' + venue_name + '</p>'
                + '<p>Venue contact: ' + venue_contact + '</p>' 
                + '<p>Venue location: ' + venue_location + '</p>' 
                + '<p>Venue categories: ' + venue_categories + '</p>' 
                + '<p>Venue URL: ' + venue_url + '</p>'
                + '<p>Venue rating: ' + venue_rating + '</p>'
                + '<p><em>What they say about this place...</em></p>'
                + '<blockquote><p>' + venue_randomized_comment + '</p></blockquote>'
                ;
        
            view += '</div>';

            view +=
            '<div class="col-sm-6">'
                + '<iframe src="' + getGoogleMapURL(venue_lat, venue_lng) + '"></iframe>'
            + '</div></div>';
        }
    }
    
    view += '</div>';
    
    // render it!
    app.innerHTML = view;
}

/*
*   Private functions
*
*/

// inner function used by getLocation()
function setCoordinate(position) {
    this_latitude = position.coords.latitude;
    this_longitude = position.coords.longitude;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {        
            // if everything goes well, load the app  
            loadApp(xhr.responseText);
        }
    }

    xhr.open('get', getFoursquareExploreEndpoint(this_latitude, this_longitude));
    xhr.send();
}

function join_text (arr) {
    var text = '';

    for(var a=0; a<arr.length; a++) {
        // is it object?
        
        if(arr[a] === Object(arr[a])) {
            var values = Object.values(arr[a]);

            for(var c=0; c<values.length; c++) {
                text += values[c];
                console.log(values[c]);
                
            }
        } else {
            text += arr[a];
        }
    }

    return text;
}

function categories_stringify(cat) {
    var categories = '';
    for(var i = 0; i < cat.length; i++) {
        categories += cat[i].name;
    }
    return categories;
}

function randomize_comment(tips) {
    var comment = '';

    if(typeof tips !== 'undefined' && tips.length >= 0) {
        var rand = Math.floor(Math.random() * ((tips.length-1) - 0 + 1)) + 0;
        comment = tips[rand].text;
    }
    
    return comment;
}

// Returns the Foursquare HTTP endpoint
function getFoursquareExploreEndpoint(lat, long) {
    return "https://api.foursquare.com/v2/venues/explore?ll="+lat+","+long+"&section="+foursquare_explore_section+"&radius="+foursquare_area_radius+"&client_id="+foursquare_client_ID+"&client_secret="+foursquare_client_secret+"&v=20161016";
}

function getGoogleMapURL(lat, lng) {
    return "https://www.google.com/maps/embed/v1/view?key="+GOOGLE_API_KEY+"&center="+lat+","+lng+"&zoom=18";
}

function getFoursquareEndpoint_VenueDetail(id) {
    return "https://api.foursquare.com/v2/venues/"+id+"?client_id="+foursquare_client_ID+"&client_secret="+foursquare_client_secret+"&v=20161016";
}


