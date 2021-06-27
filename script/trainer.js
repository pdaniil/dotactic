const btnStartTrainerPerson = document.querySelector('#btnStartTrainerPerson');
const btnOpenWindowTrainer = document.querySelector('#openWindowTrainer');
const btnClosePerson = document.querySelector('#btnClosePerson');
const event = new Event("click");
const btnRestart = document.querySelector('#btnRestart');
const btnEndGame = document.querySelectorAll('.btnEndGame');
btnRestart.addEventListener('click', ()=>{
	document.querySelector('#helpPlace').textContent = '';
	timer1.stop();
	timer1.start();
	startGame();
	saveResult = false;
});

const picClose = document.querySelector('#btnClosePicWindow');
const wordClose= document.querySelector('#btnCloseWordWindow');
picClose.addEventListener('click',()=>{
	saveResult = false;
});
wordClose.addEventListener('click',()=>{
	saveResult = false;
});
btnStartTrainerPerson.addEventListener('click', ()=> {
	btnClosePerson.dispatchEvent(event);
	btnOpenWindowTrainer.dispatchEvent(event);
	document.querySelector('#helpPlace').textContent = '';
	timer1.stop();
	timer1.start();
	startGame();

});



let time = 60;
let Timer = function(obj) {
	this.time = obj.time;
	this.onEnd = obj.onEnd || null;
	this.onStart = obj.onStart || null;
	this.onTick = obj.onTick || null;
	this.intervalID = null;

	this.start = () => {
		this.interval = setInterval(this.update, 1000);
	};

	this.stop = async function()  {
		clearInterval(this.interval);
		if (saveResult) {
			
			const eventLive = new Event("click");
			document.querySelector('#liveToastBtn').dispatchEvent(eventLive);
			saveResult = false;
			await saveResultInDB(conuterItem/60 * 100);
			await showSetting();
			const newEvent = new Event("click");
			document.querySelector('#btnClosePicWindow').dispatchEvent(newEvent);
			conuterItem = 0;
			const newEventtow = new Event("click");
			document.querySelector('.btnOpenPersAfterGame').dispatchEvent(newEventtow);
		}
		this.time = 61;
	};

	this.update = ()=> {
		this.time > 0 ? this.time -= 1 : this.stop();
		this.onTick ? this.onTick() : void 0;
		return this.get();
	};

	this.get = ()=> {
		return this.time;
	};
}

let timer1 = new Timer({
	time: time,
	onTick: tick
});
async function saveResultInDB(input){
	const outRes = +input.toFixed(0);
	document.querySelector('#resLive').textContent='('+  outRes + ')';
	let result = +document.querySelector('#placeKPD').textContent;
	const login = document.querySelector('#offCanvasHeader').textContent;
	let final= result + input;
	final= final / 2;
	final = final.toFixed(2);
	const out = {
		login: login,
		result: final,
	};
	let response = await fetch('../server/saveResult.php', {
			method: 'post',
			headers: {'Content-Type': 'application/json;charset=utf-8'},
			body: JSON.stringify(out),
		});

		let resulttwo = await response.text();
		console.log(resulttwo);
}


requestAnimationFrame(tick);

function tick() {
	id("output").textContent = timer1.get();
}

function id(id) {
	return document.getElementById(id);
}

let counter = 0;
let result;
async function startGame() {
	let response = await fetch('../server/startGame.php');
	result = await response.json();
	await nextItem(result.pop());
	document.querySelector('#successRectangle').classList.remove('successActive');
	document.querySelector('#errorRectangle').classList.remove('errorActive');
	document.querySelector('#itemNameTrainerInput').value = '';
	document.querySelector('#collapseExample').classList.remove('show');
	windowTrainer.addEventListener('keyup', setOpenInputFunction, false);
	document.querySelector('#itemNameTrainerInput').removeEventListener('keyup', bringItemAndShowNextItem,false);
	document.querySelector('#itemNameTrainerInput').removeEventListener('keydown', cathEnterIntoInputItemName, false);
}


async function nextItem(item) {
	const imgTrainerPlace = document.querySelector('#imgTrainerPlace');
	imgTrainerPlace.textContent = '';
	const imgTrainer = document.createElement('img');
	imgTrainer.src = '';
	imgTrainer.src = item.src;

	imgTrainerPlace.appendChild(imgTrainer);
	
	const helpPlace = document.querySelector('#helpPlace');
	helpPlace.textContent = item.name;
	if (!document.querySelector('#flexCheckChecked').checked) {
		helpPlace.style.visibility = 'hidden';
	}
	
}

let conuterItem = 0;
let saveResult = false;
async function bringItemAndShowNextItem(event) {
	if (event.code == "Key"	+ document.querySelector('#bringItem').value.toUpperCase()) {
		await nextItem(result.pop());
		document.querySelector('#itemNameTrainerInput').removeEventListener('keyup', bringItemAndShowNextItem,false);
		windowTrainer.addEventListener('keyup', setOpenInputFunction, false);
		document.querySelector('#btnTargetForTrainer').focus();
		document.querySelector('#successRectangle').classList.remove('successActive');
		const btnOpenShopTrainer = document.querySelector('#openShopTrainer');
		const eventFocus = new Event("click");
		btnOpenShopTrainer.dispatchEvent(eventFocus);
		conuterItem++;
		saveResult = true;
	}
}

async function cathEnterIntoInputItemName(event) {
	if(event.keyCode == 13) {
		if (document.querySelector('#itemNameTrainerInput').value.toLocaleLowerCase() === document.querySelector('#helpPlace').textContent.toLocaleLowerCase()) {
			document.querySelector('#itemNameTrainerInput').addEventListener('keyup', bringItemAndShowNextItem, false);
			document.querySelector('#itemNameTrainerInput').removeEventListener('keydown', cathEnterIntoInputItemName, false);
			document.querySelector('#successRectangle').classList.add('successActive');
			document.querySelector('#errorRectangle').classList.remove('errorActive');
		} 
		else{
			document.querySelector('#errorRectangle').classList.add('errorActive');
		}
	}
}

async function setOpenInputFunction(event) {
	if (event.code == "Key"	+ document.querySelector('#openShop').value.toUpperCase()) {
		const btnTargetInputName =  document.querySelector('#btnTargetInputName');
		const btnOpenShopTrainer = document.querySelector('#openShopTrainer');
		const eventFocus = new Event("click");
		btnOpenShopTrainer.dispatchEvent(eventFocus);
		const inputName = document.querySelector('#itemNameTrainerInput');
		inputName.focus();
		inputName.value = '';
		inputName.addEventListener('keydown', cathEnterIntoInputItemName, false);
		windowTrainer.removeEventListener('keyup', setOpenInputFunction, false);

	}
}


const windowTrainer = document.querySelector('#staticBackdrop');
windowTrainer.addEventListener('keyup', setOpenInputFunction, false);

function showHideToast() {
	const toast = document.querySelector('#liveToast');
	toast.classList.toggle('show');
	toast.classList.toggle('hide');
}

const toast = document.querySelector('#liveToastBtn');
toast.addEventListener('click', ()=> {
	showHideToast();
	setTimeout(showHideToast, 5000);
});









