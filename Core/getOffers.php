<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  
require("connect1.php");
function parseToXML($htmlStr) 
{ 
$xmlStr=str_replace('<','&lt;',$htmlStr); 
$xmlStr=str_replace('>','&gt;',$xmlStr); 
$xmlStr=str_replace('"','&quot;',$xmlStr); 
$xmlStr=str_replace("'",'&#39;',$xmlStr); 
$xmlStr=str_replace("&",'&amp;',$xmlStr); 
return $xmlStr; 
} 

// Get parameters from URL
$store_id = $_GET["id"];

// Set the active MySQL database
$db_selected = mysql_select_db('buzzx7nt_throt', $con);
if (!$db_selected) {
  die ('Can\'t use db : ' . mysql_error());
}

// Select all the rows in the outletOffers table
$query = sprintf("SELECT * FROM outletOffers HAVING outletid = " . $store_id ." ORDER BY id DESC");

$result = mysql_query($query);
if (!$result) {
  die('Invalid query: ' . mysql_error());
}

//Create an array
    $json_response = array();
  
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
        $row_array['id'] = $row['id'];
        $row_array['outletid'] = $row['outletid'];
        $row_array['offername'] = $row['offername'];
        $row_array['offerdescription'] = $row['offerdescription'];
		$row_array['offerpicture'] = $row ['offerpicture'];
		$row_array['offerlimit'] = $row ['offerlimit'];
		$row_array['offernotes'] = $row ['offernotes'];		
        
        //push the values in the array
        array_push($json_response,$row_array);
    }
    echo json_encode($json_response);
?>