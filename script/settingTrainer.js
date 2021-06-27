async function showSetting() {
	let response = await fetch('../server/loadSetting.php', {
			method: 'post',
			headers: {'Content-Type': 'application/json;charset=utf-8'},
			body: JSON.stringify(document.querySelector('#offCanvasHeader').textContent),
	});
	const result = await response.json();
	document.querySelector('#placeKPD').textContent = result.result;
	document.querySelector('#openShop').value =  result.open_shop;
	document.querySelector('#bringItem').value = result.bring_item;

	if (result.flex_check_checked == 1) {
		document.querySelector('#flexCheckChecked').checked =true;
	}
	else {
		document.querySelector('#flexCheckChecked').checked = false;
	}
}

async function setSetting() {
	const setting = {
		login: document.querySelector('#offCanvasHeader').textContent,
		openShop: document.querySelector('#openShop').value,
		bringItem: document.querySelector('#bringItem').value,
		flexCheckChecked: document.querySelector('#flexCheckChecked').checked
	};

	let response = await fetch('../server/settingTrainer.php', {
			method: 'post',
			headers: {'Content-Type': 'application/json;charset=utf-8'},
			body: JSON.stringify(setting),
	});
	const result = await response.text();
	await showSetting();
}

const saveSetting = document.querySelector('#saveSetting');
saveSetting.addEventListener('click', setSetting);


