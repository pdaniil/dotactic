<?php 
	require_once 'rb/rb.php';
	//резервируем соединение
	R::setup( 'mysql:host=localhost;dbname=u1339275_default', 'u1339275_default', 'SuBj_fQ4' );	
	//проверяем, установлено ли соединение
	if (!R::testConnection()){
		exit('Не удалось осуществить подключение к базе данных.');
	}

	session_start();


?>