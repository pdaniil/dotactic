<?php 
	require_once 'connection.php';
	$rawData = file_get_contents('php://input');
   $data = json_decode($rawData);

   $userSub = R::getAll('SELECT * FROM `users` WHERE `login` = ?', array(
   	$data->login));
   $user = R::load('users', $userSub[0]["id"]);
   echo $data->result;
   $user->result = $data->result;
   R::store($user);
?>