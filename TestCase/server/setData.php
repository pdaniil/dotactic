<a href="../index.html"><h1>НА ГЛАВНУЮ</h1></a>
<?php 
	require_once 'connection.php';
	echo "Тут будет заполняться бд";
	$arrName = [
		0 => "Даниил",
		1 => "Сергей",
		2 => "Дмитрий",
		3 => "Евгений",
		4 => "Николай",
	];

	$arrSername = [
		0 => "Проскурин",
		1 => "Филатов",
		2 => "Ключников",
		3 => "Васильков",
		4 => "Пупкин"
		,
	];

	$arrPhone = [
		0 => "+79617899865",
		1 => "+79861265328",
		2 => "+79612345687",
		3 => "+79851235278",
		4 => "+79512345678",
	];

	for ($i = 0; $i < 7000; $i++)	
	{
		$user = R::dispense("users");
		$user->name = $arrName[rand(0,4)];
		$user->sername = $arrSername[rand(0,4)];
		$user->phone = $arrPhone[rand(0,4)];
		R::store($user);
	}
?>
