<?php
	
	if (isset($_SESSION['logged_user'])) {
		if ($_SESSION['logged_user']->login == 'IAmJakeHill') {
			echo 'Ты админ';
		}
		else {
			echo 'Ты не админ!';
		}
	}
	else {
		echo 'Пользователь не авторизован!';
	} 

?>