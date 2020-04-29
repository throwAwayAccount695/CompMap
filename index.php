<!DOCTYPE html>
<html>
<head>
    <title>Comp Map</title>

	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico" />

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin=""/>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

<div id="map-id" ></div>
<div id="address_container">
    <form class="form-map" action="index.php" method="POST">
        <input class="input" type="text" placeholder="Firmanavn" name="firm_name" value=""><br>
        <input class="input" type="text" placeholder="Adresse" name="address" value=""><br>
        <div class="inline">
            <input class="input" type="text" placeholder="Postnummer" name="zipcode" value="">
            <input class="input" type="text" placeholder="By" name="city" value="">
        </div><br>
        <button class="button-submit" type="submit" name="submit">Tilføj</button>
        <p></p>
    </form>
</div>


<script 
    src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" 
    integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==" 
    crossorigin="">
</script>
<script src="js/scripts.js"></script>
</body>
</html>
