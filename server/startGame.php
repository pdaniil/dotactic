<?php 
	
	require_once 'connection.php';
	$items = R::getAll('SELECT * from `items`');
	shuffle($items);
	echo json_encode($items);
?>