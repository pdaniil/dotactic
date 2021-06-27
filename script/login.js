async function validUser (user) {
	let response = await fetch('../server/validUser.php', {
			method: 'post',
			headers: {'Content-Type': 'application/json;charset=utf-8'},
			body: JSON.stringify(user),
	});

	const result = await response.text();
	if (result != '$error') {
		return false;
	}
	else{
		return true;
	}
}

async function getUser() {
	const loginUser = document.querySelector('#inputLoginLogin').value;
	const passwordUser = document.querySelector('#inputPassLogin').value;
	const user = {
		login: loginUser,
		password: passwordUser
	};

	const check = await validUser(user);
	if (check) {
		document.querySelector('.errorLogin').textContent = 'Логин либо пароль введены не правильно.';

	}

	else{
		document.querySelector('.errorLogin').textContent = '';
		window.location.replace('../index.html');
	}
}

document.querySelector('#btnLogin').addEventListener('click', getUser);