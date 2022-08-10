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
    
    //list all 
    if ($method === 'all') {
        $query = 'SELECT * FROM notes ORDER BY `active` DESC, `added` DESC';
    //list only active notes
    } else if ($method === 'active') {
        $query = 'SELECT * FROM notes WHERE `active`=1 ORDER BY `added` DESC';
    //list only inactive notes
    } else if ($method === 'inactive') {
        $query = 'SELECT * FROM notes WHERE `active`=0 ORDER BY `added` DESC';
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
    //add a new note
    if ($method === 'insert') {
        $query = 'INSERT INTO notes (text, added) VALUES ("' . $_POST['text'] . '", "' . $_POST['added'] . '")';
    
    //update a note
    } else if ($method === 'update') {
        $query = 'UPDATE notes SET text = "' . $_POST['text'] . '", active = 1, added = "' . $_POST['added'] . '" WHERE id = ' . $_POST['id'];
    
    //archive a note
    } else if ($method === 'archive') {
        $query = 'UPDATE notes SET active = 0 WHERE id = ' . $_POST['id'];

    //activate a note
    } else if ($method === 'activate') {
        $query = 'UPDATE notes SET active = 1 WHERE id = ' . $_POST['id'];

    //delete a note
    } else if ($method === 'delete') {
        $query = 'DELETE FROM notes WHERE id = ' . $_POST['id'];
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