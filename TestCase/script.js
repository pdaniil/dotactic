
let iterCounter = +1;
const countUser = 100;
let flag =false;
async function addUsers(arrUsers){
		const tableUsers = document.querySelector('#tableUsers');
	
		for (let i = 0; i < countUser; i++){
		let user = arrUsers[i];

		const tr = document.createElement('tr');

		const id = document.createElement('th');
		const sername = document.createElement('th');
		const name = document.createElement('th');
		const phone = document.createElement('th');

		id.textContent = user.id;
		sername.textContent = user.sername;
		name.textContent = user.name;
		phone.textContent = user.phone;

		tr.appendChild(id);
		tr.appendChild(sername);
		tr.appendChild(name);
		tr.appendChild(phone);

		tableUsers.appendChild(tr);
		
	
	}
}

async function getUsers(data) {
	if (data) {
		let response = await fetch('server/getData.php', {
			   method: 'post',
			   headers: {'Content-Type': 'application/json;charset=utf-8'},
			   body: JSON.stringify(data), 	
			});
	let result = await response.json();
	await addUsers(result);

	console.log("data getUsers after fetch: " + data);
	flag = true;
	}
	else{
		let data = {
			id: iterCounter,
			count_str: countUser,
		};
		let response = await fetch('server/getData.php', {
			   method: 'post',
			   headers: {'Content-Type': 'application/json;charset=utf-8'},
			   body: JSON.stringify(data), 	
			});
	let result = await response.json();
	await addUsers(result);

	console.log("data getUsers after fetch: " + data);
	flag = true;
	}
	

}


function sumAB(a,b){
	return a + b;
}

getUsers();
jQuery(document).ready(function ($) {
   //скроллинг
   $(window).scroll(function () {

      if ($(window).height() + $(window).scrollTop() >= $(document).height() && flag) {
      	flag = false;
      	iterCounter = sumAB(+iterCounter,+countUser);
      	console.log("iterCounter after scroll: " + iterCounter);
      	let data = {
			id: iterCounter,
			count_str: countUser,
		};

		getUsers(data);
   	  }
	});


});