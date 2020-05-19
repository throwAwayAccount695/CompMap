//variables.
var markers = [];


//function calls on start.
window.addEventListener('DOMContentLoaded', (event) => {
    get_markers();
});


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
    var address = document.getElementById("address").value;
    address = address.replace(" ", '+').replace(",", '');

    var arr = [firm_name, address, zipcode];
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
            document.getElementById("company_hidden").innerHTML = obj.company_name;
            document.getElementById("address_hidden").innerHTML = obj.address;
            document.getElementById("zipcode_hidden").innerHTML = obj.postnr;
            document.getElementById("company_display").innerHTML = "Firmanavn: " + obj.company_name;
            document.getElementById("address_display").innerHTML ="Adresse: " + obj.address;
            document.getElementById("city_display").innerHTML = "By: " + obj.distrikt;
            document.getElementById("zipcode_display").innerHTML = "Postnummer: " + obj.postnr;
            document.getElementById("update_box").setAttribute("hidden", true); 
            document.getElementById("firm_name_update").removeAttribute("hidden"); 
            document.getElementById("address_update").removeAttribute("hidden"); 
            document.getElementById("zipcode_update").removeAttribute("hidden"); 
        }), obj];
    markers.push(arr);
}

//insert a given row in the database.
function insert_marker(obj, data){
    var xhttp = new XMLHttpRequest();
    xhttp.open
        ('GET', 
        "http://localhost/CompMap/classes/Insert.php?company_name=" 
        + data[0] + "&address=" + data[1] + "&postnr=" + data[2] + "&lat=" + obj.lat + "&lon=" + obj.lon, true);
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

//function for update_marker to work
//collects exicting data and opens update window
function open_update(){
    var company = document.getElementById("company_hidden").textContent;
    var address = document.getElementById("address_hidden").textContent;
    var zipcode = document.getElementById("zipcode_hidden").textContent;
    var id = document.getElementById("marker_id").textContent;
    document.getElementById("firm_name_update").value = company;
    document.getElementById("address_update").value = address;
    document.getElementById("zipcode_update").value = zipcode;
    document.getElementById("marker_id_update").value = id;
    document.getElementById("update_box").removeAttribute("hidden"); 
}

//collect data from form. update.
function collect_data_update(){
    var firm_name = document.getElementById("firm_name_update").value;
    var zipcode = document.getElementById("zipcode_update").value;
    var address = document.getElementById("address_update").value;
    address = address.replace(" ", '+').replace(",", '');

    var arr = [firm_name, address, zipcode];
    return arr; 
}

//gets updated data from openstreetmap.org
function update_marker(data_arr){
    var search_string = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let obj = JSON.parse(xhttp.responseText);
            update_marker_insert(obj, data_arr);
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

//updates a given row in the database.
function update_marker_insert(obj, data){
    var id = document.getElementById("marker_id_update").value;
    var xhttp = new XMLHttpRequest();
    xhttp.open(
        'GET', "http://localhost/CompMap/classes/Update.php?company_name="
        + data[0] + "&address=" + data[1] + "&postnr=" + data[2] + "&lat=" + obj[0].lat + "&lon=" + obj[0].lon + "&id=" + id, true);
    xhttp.send();
    location.reload();
}
