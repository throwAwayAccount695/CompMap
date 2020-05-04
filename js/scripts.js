var map = L.map('map-id').setView([55.781582, 10.574432], 8);
var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
OpenStreetMap.addTo(map);

function collect_data(){
    var firm_name = document.getElementById("firm_name").value;
    console.log("firmaets navn er: " + firm_name);

    var address = document.getElementById("address").value;
    console.log("firmaets addresse er: " + address);

    var zipcode = document.getElementById("zipcode").value;
    console.log("firmaets postnummer er: " + zipcode);

    var city = document.getElementById("city").value;
    console.log("firmaet tilhører byen: " + city);
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        var obj = JSON.parse(xhttp.responseText);
        console.log(obj);
        document.getElementById("demo").innerHTML = obj[0].lat;
    }
};
xhttp.open('GET', "https://nominatim.openstreetmap.org/search?q=%22Ejlskovsgade%203%205000%20denmark%22&format=json", true);
xhttp.send();
