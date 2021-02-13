<?php
$myfile = fopen("../indexes.json", "w") or die("Unable to open file!");

$txt = $_POST['text'];

fwrite($myfile, $txt);

fclose($myfile);

echo 'File saved.'
?>