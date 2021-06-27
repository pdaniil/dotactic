<?php 
	require_once 'connection.php';
	$rawData = file_get_contents('php://input');
   $data = json_decode($rawData);


	$user= R::findOne('users','`login` = ?', array(
			$data->login
		));
	$success = true;
	$error = false;

	if ((!$user) || (!password_verify($data->password, $user->password))){
		echo '$error';
	}
	else {
		echo '$success';
		$_SESSION['logged_user'] = $user;
	}

?>