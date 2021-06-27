<?php 
	require_once 'connection.php';
	$rawData = file_get_contents('php://input');
   $data = json_decode($rawData);
   $user = R::dispense('users');
   $user->login = $data->login;
   $user->password = password_hash($data->password, PASSWORD_DEFAULT);
   $user->result = (30/60)*100;
 	R::store($user);

   $userSetting = R::dispense('setting');
   $userSetting->login =   $user->login;
   $userSetting->openShop = 'o';
   $userSetting->bringItem = 'b';
   $userSetting->flexCheckChecked = true;
   R::store($userSetting);

?>