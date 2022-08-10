<?php
include 'config.php';
/***********************************************************
 * CONNECT TO THE DATABASE
 */
$link = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);
if (mysqli_connect_error()) {
    die("There was an error connecting to the database.");
};
/***********************************************************
 * HANDLING GET REQUESTS
 */
if (array_key_exists("met", $_GET)) {
    $method = $_GET['met'];
    //search by name
    if ($method === 'sr') {
        $query = 'SELECT * FROM tiles WHERE `name` LIKE "%'. $_GET['name'] .'%"';
    //list all by category
    } else if ($method === 'all') {
        $query = 'SELECT * FROM tiles WHERE `category`="' . $_GET['cat'] . '" ORDER BY `priority` ASC';
    //listh the whole table
    } else if ($method === 'full') {
        $query = 'SELECT * FROM tiles';
    };
    //fetch and encode data to JSON, then return it
    $data = json_encode(mysqli_fetch_all(mysqli_query($link, $query), MYSQLI_ASSOC));
    if (!$data) {
        echo 'Something went wrong';
    };
    echo $data;
};
/***********************************************************
 * HANDLING POST REQUESTS
 */
if (array_key_exists("method", $_POST)) {
    $method = $_POST['method'];
    //add a new row
    if ($method === 'insert') {
        $query = 'INSERT INTO tiles (category, name, link, icon, priority) VALUES ("' . $_POST['category'] . '", "' . $_POST['name'] . '", "' . $_POST['link'] . '", "' . $_POST['icon'] . '", "' . $_POST['prio'] . '")';
    //update an existing row
    } else if ($method === 'update') {
        $query = 'UPDATE tiles SET category = "' . $_POST['category'] . '", name = "' . $_POST['name'] . '", link = "' . $_POST['link'] . '", icon = "' . $_POST['icon'] . '", priority = "' . $_POST['prio'] . '" WHERE id = ' . $_POST['id'];
    //delete a row
    } else if ($method === 'delete') {
        $query = 'DELETE FROM tiles WHERE id = ' . $_POST['id'];
    };
    //make the query and return result (good or bad :) 
    if (mysqli_query($link, $query)) {
        echo 1;
    } else {
        echo 0;
    };
};
mysqli_close($link);
?>