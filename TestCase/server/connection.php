<?php 
	require_once '../../server/rb/rb.php';
	R::setup( 'mysql:host=localhost;dbname=u1339275_forwork', 'u1339275_default', 'SuBj_fQ4' );	
	if (!R::testConnection()){
		exit('Не удалось осуществить подключение к базе данных.');
	}
?>