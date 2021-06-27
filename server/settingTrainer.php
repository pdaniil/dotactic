<?php 
	require_once 'connection.php';
	$rawData = file_get_contents('php://input');
   $data = json_decode($rawData);


   $idSetting = R::findOne('setting','`login` =  ?', array(
   	$data->login
   ));

   $userSetting = R::load('setting',$idSetting->id);
   echo $idSetting->id;

   $userSetting->login = $data->login;
 
   $userSetting->openShop = $data->openShop;
   $userSetting->bringItem = $data->bringItem;
   $userSetting->flexCheckChecked = $data->flexCheckChecked;
   R::store($userSetting);
?>