//variables.
var markers = [];


//function calls on start.
window.addEventListener('DOMContentLoaded', (event) => {
    get_markers();
    console.log(markers);
});
//update_marker("company_name", "sample text", 2);



//map instantiation
var map = L.map('map-id').setView([55.781582, 10.574432], 8);
var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
OpenStreetMap.addTo(map);

//collect data from form.
function collect_data(){
    var firm_name = document.getElementById("firm_name").value;
    var zipcode = document.getElementById("zipcode").value;
    var city = document.getElementById("city").value;
    var address = document.getElementById("address").value;
    address = address.replace(" ", '+').replace(",", '');

    var arr = [firm_name, address, city, zipcode];
    return arr; 
}

//get json from openStreetMap.
function place_marker(data_arr){
    var search_string = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let obj = JSON.parse(xhttp.responseText);
            insert_marker(obj[0], data_arr);
            location.reload();
        }
    };
    for (let j = 1; j < data_arr.length; j++) {
        if(j != data_arr.length - 1){
            search_string += data_arr[j] + "+";
        } else {
            search_string += data_arr[j];
        }
    } 
    xhttp.open('GET', "https://nominatim.openstreetmap.org/search?q=" + search_string + "&format=json", true);
    xhttp.send();
}

//gets json from Readall.php with all info about markers.
function get_markers(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let obj = JSON.parse(xhttp.responseText);
            for (let i = 0; i < obj.length; i++) {
                add_marker(obj[i]);
            }
        }
    };
    xhttp.open('GET', "http://localhost/CompMap/classes/Readall.php", true);
    xhttp.send();
}

//adds a marker to the map.
function add_marker(obj){
    var arr = 
        [L.marker([obj.lat, obj.lon]).addTo(map).on('click', 
        function(){
            document.getElementById("marker_id").innerHTML = obj.id;
            document.getElementById("company_display").innerHTML = "Firmanavn: " + obj.company_name;
            document.getElementById("address_display").innerHTML ="Adresse: " + obj.address;
            document.getElementById("city_display").innerHTML = "By: " + obj.distrikt;
            document.getElementById("zipcode_display").innerHTML = "Postnummer: " + obj.postnr;
        }), obj];
    markers.push(arr);
}


//updates a given row in the database.
function update_marker(update_key, update_value, id){
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', "http://localhost/CompMap/classes/Update.php?" + update_key + "=" + update_value + "&id=" + id, true);
    xhttp.send();
}

//insert a given row in the database.
function insert_marker(obj, data){
    var xhttp = new XMLHttpRequest();
    xhttp.open
        ('GET', 
        "http://localhost/CompMap/classes/Insert.php?company_name=" 
        + data[0] + "&address=" + data[1] + "&postnr=" + data[3] + "&lat=" + obj.lat + "&lon=" + obj.lon, true);
    xhttp.send();
}

//delete a given row in the database.
function delete_row(){
    var xhttp = new XMLHttpRequest();
    var id = document.getElementById("marker_id").textContent;
    xhttp.open('GET', "http://localhost/CompMap/classes/Delete.php?id=" + id, true);
    xhttp.send();
    location.reload();
}

