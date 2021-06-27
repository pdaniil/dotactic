
const iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?";

async function validation() {
	if (flagLogin && flagPassword && flagPasswordRepeat) {

		const user = {
			login: inputLoginSign.value,
			password: inputPassSign.value
		};

		let response = await fetch('../server/signup.php', {
			method: 'post',
			headers: {'Content-Type': 'application/json;charset=utf-8'},
			body: JSON.stringify(user),
		});

		let result = await response.text();

		window.location.replace("../index.html");
	}

	else {
		const allValide = document.querySelector('.allValide');
		allValide.textContent = 'Заполните все поля правильно';
	}
	
}

const inputLoginSign = document.querySelector('#inputLoginSign');
const messageValid = document.querySelector('.outOfValidate');
const inputPassSign = document.querySelector('#inputPassSign');

async function checkLogin(login) {
	let response = await fetch('../server/validLogin.php', {
			method: 'post',
			headers: {'Content-Type': 'application/json;charset=utf-8'},
			body: JSON.stringify(login),
		});

		let result = await response.text();
		if (result != '') {
			return false;
		}
		else {
			return true;
		}		
}


let flagLogin = false;
let flagPassword = false;
let flagPasswordRepeat = false;

inputLoginSign.addEventListener('keyup', ()=> {
	const str = inputLoginSign.value;
	if ( str.trim().length < 6) {
		messageValid.textContent= 'Длина логина должна быть больше 6 символов.';
		flagLogin= false;
	}
	else if (!checkChar(str)) {
		messageValid.textContent= 'Не допускаются спецсимволы.';
		flagLogin = false;
	}
	else {
		messageValid.textContent= '';
		flagLogin = true;
	}
});



const outValidPass = document.querySelector('.outValidPass');
inputPassSign.addEventListener('keyup', () => {
	const str = inputPassSign.value;
	if (str.trim().length < 6) {
		outValidPass.textContent = 'Длина пароля должна быть больше 6 символов';
		flagPassword = false;
	}
	else if (!checkChar(str)) {
		outValidPass.textContent = 'Не допускаются спецсимволы.'
		flagPassword = false;
	}
	else {
		outValidPass.textContent = '';
		flagPassword = true;
	}
});

inputPassSign.addEventListener('focus', async function() {
	const login= inputLoginSign.value;
	const check = await checkLogin(login);
	if (check) {
		flag = true;
		messageValid.textContent = '';
		}
		else {
			
			flag = false;
			messageValid.textContent = 'Данный логин уже занят.';
		}
	
	

});

const message = 'Пароли не совпадают';
const inputRepeatPass= document.querySelector('#againPassSign');
const messagePlace = document.querySelector('.outValidPassRepeat');
againPassSign.addEventListener('keyup', ()=>{
	if (inputPassSign.value != inputRepeatPass.value) {
		messagePlace.textContent = message;
		flagPasswordRepeat = false;
	}
	else 
	{
		
		messagePlace.textContent = '';
		flagPasswordRepeat = true;
	}





});


function checkChar(str) {
	for (let i = 0; i<str.length;i++) {
		if (iChars.indexOf(str[i]) != -1) {
			return false;
		}
	}

	return true;
}