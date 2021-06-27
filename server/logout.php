<?php 
	require_once 'connection.php';
	unset($_SESSION['logged_user']);
	header('Location: ../index.html');
?>