<?php
// file export part of code from Jan Schöpke
// https://gist.github.com/janschoepke/3e7a3639546d0d740c023e11289cf13d#file-export_csv-php-L14

include 'config.php';
/***********************************************************
 * CONNECT TO THE DATABASE
 */
$link = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);
if (mysqli_connect_error()) {
    die("There was an error connecting to the database.");
};

// add current date to the filename
$csv_filename = 'tiles_db_'.date('Y-m-d').'.csv';

// create empty variable to be filled with export data
$csv_export = '';

// query to get data from database and get field number
$query = mysqli_query($link, "SELECT * FROM tiles");
$field = mysqli_field_count($link);

// loop through database query and fill export variable
while($row = mysqli_fetch_array($query)) {
    // create line with field values
    for($i = 0; $i < $field; $i++) {
        $csv_export.= '"'.$row[mysqli_fetch_field_direct($query, $i)->name].'",';
    }
    $csv_export.= '
';
}
// Export the data and prompt a csv file for download
header("Content-type: text/x-csv");
header("Content-Disposition: attachment; filename=".$csv_filename."");
echo($csv_export);
?>

