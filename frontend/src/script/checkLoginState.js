
import createElement from "./createElement.js"
import loginUser from "./loginUser.js";
import signUpUser from "./signUpUser.js";

const navBar = document.getElementById('navBar')
const mainContainer = document.getElementById('mainContainer');

export default function checkLoginState() {
	if (localStorage.getItem('loggedInUser')) {
		//Is logged in
        mainContainer.innerText = ''
		console.log('logged in');

        const loginUserPage = document.createElement('div') 
        loginUserPage.id = 'loginUserPage'
        loginUserPage.className = 'loginUserPage'
        mainContainer.appendChild(loginUserPage)
        const welcomeUserHeadin = document.createElement('h2')
        // getUserOrders()
        welcomeUserHeadin.innerText = `Welcome ${localStorage.getItem('loggedInUserName')}`
        loginUserPage.appendChild(welcomeUserHeadin)
		const logoutBtn = document.createElement('button');
		logoutBtn.id = 'logoutBtn';
		logoutBtn.className = 'logoutBtn';
		logoutBtn.innerText = 'Sign out';
		loginUserPage.appendChild(logoutBtn);

        logoutBtn.addEventListener('click', logoutUser)

	} else {
		//Not logged in
        mainContainer.innerText = ''
        const loginContainer = createElement(
            'section',
            `loginContainer`,
            'loginContainer',
            ``
        );
        mainContainer.appendChild(loginContainer)

        const emailLable = createElement(
            'label',
            `emailLabel`,
            'emailLabel',
            `E-mail address: `
        );
        loginContainer.appendChild(emailLable)

        const emailInput = createElement(
            'input',
            `emailInput`,
            'emailInput',
            ``
        );
        emailLable.appendChild(emailInput)

        const passwordLabel = createElement(
            'label',
            `passwordLabel`,
            'passwordLabel',
            `Password: `
        );
        loginContainer.appendChild(passwordLabel)

        const passwordInput = createElement(
            'input',
            `passwordInput`,
            'passwordInput',
            ``
        );
        passwordLabel.appendChild(passwordInput)

        const loginBtn = createElement(
            'button',
            `loginBtn`,
            'loginBtn',
            `Login`
        );
      
        const signUpBtn = createElement(
            'button',
            `signUpBtn`,
            'signUpBtn',
            `Sign-up`
        );
        loginContainer.append(loginBtn, signUpBtn)

        signUpBtn.addEventListener('click', signUpUser);
        loginBtn.addEventListener('click', () => loginUser(emailInput, passwordInput));
	}
}