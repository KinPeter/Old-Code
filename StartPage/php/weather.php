<?php
// Get cURL resource
$curl = curl_init();
$lat = $_GET['lat'];
$lon = $_GET['lon'];
$key = $_GET['key'];
// Set some options 
curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => 'https://api.darksky.net/forecast/' . $key . '/' . $lat . ',' . $lon . '?exclude=hourly,flags&units=si'
));
// Send the request & echo response 
echo curl_exec($curl);
// Close request to clear up some resources
curl_close($curl);

// 47.4977,19.0791
?>