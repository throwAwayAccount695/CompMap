//variables
var cordinates;
var markers = [];

//map instantiation
var map = L.map('map-id').setView([55.781582, 10.574432], 8);
var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
OpenStreetMap.addTo(map);

//collect data from form
function collect_data(){
    var firm_name = document.getElementById("firm_name").value;
    var zipcode = document.getElementById("zipcode").value;
    var city = document.getElementById("city").value;
    var address = document.getElementById("address").value;
    address = address.replace(" ", '+').replace(",", '');

    return address + "+" + zipcode + "+" + city; 
}

//get json from openStreetMap
function place_marker(search_string){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            cordinates = JSON.parse(xhttp.responseText);
            success();
        }
    };
    xhttp.open('GET', "https://nominatim.openstreetmap.org/search?q=" + search_string + "&format=json", true);
    xhttp.send();

    function success(){
        markers.push(L.marker([cordinates[0].lat, cordinates[0].lon]).addTo(map));
    }
}



