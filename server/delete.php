<?php 
	require_once 'connection.php';
	$rawData = file_get_contents('php://input');
   $data = json_decode($rawData);

   $item = R::load('items',$data);
   R::trash($item);
?>