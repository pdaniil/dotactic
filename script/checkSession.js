async function checkSession() {
	const response = await fetch('../server/checkSession.php');
	const result = await response.text();
	if (result != 'false') {
		document.querySelector('#buttonLogin').classList.add('invisible');
		document.querySelector('#buttonSign').classList.add('invisible');
		
		const userName = document.createElement('btn');
		userName.classList.add('btn');
		userName.classList.add('btn-primary');
		userName.setAttribute('type', 'button');
		userName.addEventListener('click',showSetting);
		userName.setAttribute('data-bs-toggle', 'offcanvas');
		userName.setAttribute('data-bs-target', '#offcanvasExample');
		userName.setAttribute('aria-controls', 'offcanvasExample');
		userName.textContent = result;
		userName.classList.add('btnOpenPersAfterGame');
		const offCanvasHeader = document.querySelector('#offCanvasHeader');
		offCanvasHeader.textContent = result;
		const logOut = document.createElement('btn');
		logOut.classList.add('btn');
		logOut.classList.add('btn-secondary');
		logOut.classList.add('color-white');

		logOut.setAttribute('type', 'button');
		const linkOut = document.createElement('a');
		linkOut.classList.add('color_white');
		linkOut.href = '../server/logout.php';
		linkOut.textContent = 'Выйти';
		logOut.appendChild(linkOut);
		const loginPlace = document.querySelector('.d-flex');

		loginPlace.appendChild(userName);
		loginPlace.appendChild(logOut);
	}
}
checkSession();