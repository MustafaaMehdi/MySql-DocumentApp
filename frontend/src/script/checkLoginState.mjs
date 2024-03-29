import createElement from "../lib/createElement.mjs";
import sideNavRender from './sideNavRender.mjs';
import loginUser from './loginUser.mjs';
import signUpUser from './signUpUser.mjs';
import myDocuments from "./myDocuments.mjs";

const navBar = document.getElementById('navBar');
const mainContainer = document.getElementById('mainContainer');

export default function checkLoginState() {
	mainContainer.innerText = '';
	navBar.innerText = '';
	if (localStorage.getItem('loggedInUser')) {
		console.log('logged in');

		sideNavRender();
		myDocuments()
	} else {
        mainContainer.innerText = '';
        navBar.innerText = '';
		//Not logged in
		const loginContainer = createElement(
			'section',
			`loginContainer`,
			'loginContainer',
			``
		);
		mainContainer.appendChild(loginContainer);

		const loginHeader = createElement(
			'h2',
			`loginHeader`,
			'loginHeader',
			`Login: `
		);
		loginContainer.appendChild(loginHeader);

		const emailLable = createElement(
			'label',
			`emailLabel`,
			'emailLabel',
			`E-mail address: `
		);
		loginContainer.appendChild(emailLable);

		const emailInput = createElement('input', `emailInput`, 'emailInput', ``);
		emailLable.appendChild(emailInput);

		const passwordLabel = createElement(
			'label',
			`passwordLabel`,
			'passwordLabel',
			`Password: `
		);
		loginContainer.appendChild(passwordLabel);

		const passwordInput = createElement(
			'input',
			`passwordInput`,
			'passwordInput',
			``
		);
		passwordInput.type = 'password';
		passwordLabel.appendChild(passwordInput);

		const loginBtn = createElement('button', `loginBtn`, 'loginBtn', `Login`);

		const signUpBtn = createElement(
			'button',
			`signUpBtn`,
			'signUpBtn',
			`No account yet? Sign-up here`
		);
		loginContainer.append(loginBtn, signUpBtn);

		signUpBtn.addEventListener('click', signUpUser);
		loginBtn.addEventListener('click', () =>
			loginUser(emailInput, passwordInput)
		);
	}
}
