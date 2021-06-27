<?php 
	require_once 'connection.php';
	if (isset($_SESSION['logged_user'])) {
		echo $_SESSION['logged_user']->login;
	}
	else {
		echo 'false';
	}
?>