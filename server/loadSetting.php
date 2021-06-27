<?php 
	require_once 'connection.php';
	$rawData = file_get_contents('php://input');
   $data = json_decode($rawData);
	$userSetting= R::findOne('setting','`login` = ?', array(
			$data
		));
	$user = R::findOne('users','`login` = ?', array(
			$data
		));
	$result = (object)[
		'result' => $user->result,
		'open_shop' => $userSetting->open_shop,
		'bring_item'=>$userSetting->bring_item,
		'flex_check_checked'=>$userSetting->flex_check_checked
	];
	echo json_encode($result);
?>