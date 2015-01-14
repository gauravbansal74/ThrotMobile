<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
require("connect1.php");
$tbl_name = "userdb";
// username and password sent from form
$phoneNumber=$_POST['phoneNumber'];
$password=$_POST['password'];
$sessionId = $_POST['sessionId'];
// To protect MySQL injection (more detail about MySQL injection)
$phoneNumber = stripslashes($phoneNumber);
$password = stripslashes($password);
$sessionId = stripslashes($sessionId);
$phoneNumber = mysql_real_escape_string($phoneNumber);
$password = mysql_real_escape_string($password);
$sessionId = mysql_real_escape_string($sessionId);
if ($sessionId)
{
$sql=sprintf("SELECT * FROM $tbl_name WHERE phoneNumber='$phoneNumber' and password='$password' and sessionId ='$sessionId'");
$result = mysql_query($sql);
if (!$result) {
  die('Invalid query: ' . mysql_error());
}
// Mysql_num_row is counting table row
$count=mysql_num_rows($result);

// If result matched $phoneNumber and $password, table row must be 1 row

if($count==1){

  // Register $phoneNumber, $password and redirect to file "login_success.php"
  $loginSuccess=1;
}
else {
  $loginSuccess=0;
}

}

else {
  $sql=sprintf("SELECT * FROM $tbl_name WHERE phoneNumber='$phoneNumber' and password='$password'");
  $result = mysql_query($sql);
  if (!$result) {
    die('Invalid query: ' . mysql_error());
  }
  else{
  // Mysql_num_row is counting table row
  $count=mysql_num_rows($result);

  // If result matched $phoneNumber and $password, table row must be 1 row

  if($count==1){
    //Creating Session Id for User whose session id doesnt exist
    $sessionId=$phoneNumber."_".date('Ymd');

    //Updating Table with Session Id

    $sql="UPDATE $tbl_name SET sessionId = '$sessionId' WHERE phoneNumber='$phoneNumber'";

    if (!mysql_query($sql)) {
      die('Error: ' . mysql_error($con));
    }
    //Send the Login and Session Value
    $loginSuccess=1;
  }
  else {
    $loginSuccess=0;
  }
}

}

//Response back to front-end for POST Request
if($loginSuccess==1)
{
$data = array(
  'loginData'=>array(
    'loginSuccess'=>'1',
    'sessionId'=>$sessionId
  )
);
}
else{
  $data = array(
    'loginData'=>array(
      'loginSuccess'=>'0',
      'sessionId'=>'0'
    )
  );
}
echo json_encode($data);



?>
