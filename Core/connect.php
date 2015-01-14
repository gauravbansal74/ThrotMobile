<?php
// Create connection
$con=mysqli_connect("127.0.0.1","root","","buzzx7nt_throt");

mysql_select_db( "buzzx7nt_throt" ) or die( 'Error'. mysql_error() );

// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
?> 