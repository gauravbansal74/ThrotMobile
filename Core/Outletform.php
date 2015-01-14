<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  
include 'connect1.php';

$db_selected = mysql_select_db('buzzx7nt_throt', $con);
if (!$db_selected) {
  die ('Can\'t use db : ' . mysql_error());
}
// escape variables for security
$outletName = mysql_real_escape_string($_POST['outletName']);
$formattedAddress = mysql_real_escape_string($_POST['address']);
$latitude = mysql_real_escape_string($_POST['latitude']);
$longitude = mysql_real_escape_string($_POST['longitude']);


$sql="INSERT INTO markers (name, address,lat,lng)
VALUES ('$outletName','$formattedAddress','$latitude','$longitude')";

if (!mysql_query($sql)) {
  die('Error: ' . mysql_error($con));
}
echo "1 record added";

mysql_close($con);



?>