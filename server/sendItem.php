<?php 
	require_once 'connection.php';
	$rawData = file_get_contents('php://input');
   $data = json_decode($rawData);

   $item = R::dispense('items');
   $item->name = $data->name;
   $item->src = $data->src;

   R::store($item);

?>