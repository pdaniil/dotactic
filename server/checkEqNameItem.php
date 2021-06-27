<?php 
	require_once 'connection.php';
	$rawData = file_get_contents('php://input');
   $data = json_decode($rawData);

   $flag= R::findOne('items','`name` = ?', array(
			$data
		));
	$success = true;
	$error = false;
	if ($flag) {
		echo $success;
	}
	else {
		echo $error;
	}
?>