<?php 
	require_once 'connection.php';

	$raw_data = file_get_contents('php://input');
	$data = json_decode($raw_data);
	$arrUser = [];
	$length = $data->id + $data->count_str;
	for ($i = $data->id; $i < $length; $i++){
		$user = R::load('users',$i);
		if ($user) {
			array_push($arrUser,$user);
		}
	}

	echo json_encode($arrUser);
	
?>