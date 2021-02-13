<?php
include 'config.php';

function check($param) {
    if (preg_match("/^.*(['\"#\\n\\r\\t%_\\\]|--)+.*$/i", $param)) {
        die("Error: dangerous character found.");
    }
    return $param;
}
function checkPassword($sentPass) {
    $hashedSentPass = md5($sentPass);
    $hash = "655965897f61e9bb6aa6c6684cdeb6d1";
    return $hashedSentPass === $hash;
}

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
    $method = check($_GET['met']);
    //search by name
    if ($method === 'sr') {
        $name = check($_GET['name']);
        $query = 'SELECT * FROM linksbase WHERE `link_name` LIKE "%'. $name .'%"';

    //list all by category
    } else if ($method === 'tag') {
        $tag = check($_GET['tag']);
        $query = 'SELECT linksbase.link_id, link_name, link_url FROM linksbase LEFT JOIN linksconnections ON linksbase.link_id = linksconnections.link_id
        WHERE tag_id = ( SELECT tag_id FROM linkstags WHERE tag_name = "'. $tag .'" )';

    //list all tags for a link
    } else if ($method === 'gettags') {
        $linkid = check($_GET['linkid']);
        $query = 'SELECT tag_name FROM linkstags LEFT JOIN linksconnections ON linkstags.tag_id = linksconnections.tag_id WHERE link_id = ' . $linkid;    

    //list the whole table
    } else if ($method === 'full') {
        $query = 'SELECT * FROM linksbase';
    } else if ($method === 'namelist'){
        $query = 'SELECT link_name FROM linksbase';
    };

    //fetch and encode data to JSON, then return it
    $data = json_encode(mysqli_fetch_all(mysqli_query($link, $query), MYSQLI_ASSOC));
    if (!$data) {
        echo 'Error: No data found.';
    };
    echo $data;
};
/***********************************************************
 * HANDLING POST REQUESTS
 */
if (array_key_exists("method", $_POST)) {
    $method = check($_POST['method']);

    //check password
    $pass = check($_POST['pass']);
    if (!$pass || !checkPassword($pass)) {
        die("Error: Password do not match.");
    }

    //add a new link row
    if ($method === 'insert') {
        $name = check($_POST['name']);
        $link_url = check($_POST['link']);
        $query = 'INSERT INTO linksbase (link_name, link_url) VALUES ("' . $name . '", "' . $link_url . '")';

    //update an existing link row
    } else if ($method === 'update') {
        $name = check($_POST['name']);
        $link_url = check($_POST['link']);
        $id = check($_POST['id']);
        $query = 'UPDATE linksbase SET link_name = "' . $name . '", link_url = "' . $link_url . '" WHERE link_id = ' . $id;

    //delete a row
    } else if ($method === 'delete') {
        $id = check($_POST['id']);
        $query = 'DELETE FROM linksbase WHERE link_id = ' . $id . ' LIMIT 1';

    //add a new tag connection
    } else if ($method === 'addtag') {
        $linkid = check($_POST['linkid']);
        $tagname = check($_POST['tagname']);
        $query = 'INSERT INTO linksconnections (link_id, tag_id) VALUES ( (SELECT link_id FROM linksbase WHERE link_id = ' . $linkid . ' LIMIT 1), (SELECT tag_id FROM linkstags WHERE tag_name = "' . $tagname . '" LIMIT 1))';

    //delete all tag connections for a link
    } else if ($method === 'deletetags') {
        $linkid = check($_POST['linkid']);
        $query = 'DELETE FROM linksconnections WHERE link_id = ' . $linkid;
    };

    //make the query and return result (good or bad :) 
    if (mysqli_query($link, $query)) {
        echo 1;
    } else {
        echo "Error: Couldn't update the database.";
    };
};

?>