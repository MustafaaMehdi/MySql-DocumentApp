
import createElement from "./createElement.js"
import loginUser from "./loginUser.js";
import signUpUser from "./signUpUser.js";
import logoutUser from "./logoutUser.js";

const navBar = document.getElementById('navBar')
const mainContainer = document.getElementById('mainContainer');

export default function checkLoginState() {
    mainContainer.innerText = ''
    navBar.innerText = ''
	if (localStorage.getItem('loggedInUser')) {
		//Is logged in

		console.log('logged in');

        const documentBtnContainer = createElement(
            'section',
            `documentBtnContainer`,
            'documentBtnContainer',
            ``
        );
        navBar.appendChild(documentBtnContainer)

        const myDocumentsBtn = createElement(
            'button',
            `myDocumentsBtn`,
            'myDocumentsBtn',
            `My documents`
        );
        const createDocumentBtn = createElement(
            'button',
            `createDocumentBtn`,
            'createDocumentBtn',
            `New document`
        );

        documentBtnContainer.append(myDocumentsBtn, createDocumentBtn)

        const userSettingsContainer = createElement(
            'section',
            `userSettingsContainer`,
            'userSettingsContainer',
            ``
        );
        navBar.appendChild(userSettingsContainer)

        const userSettingsBtn = createElement(
            'button',
            `userSettingsBtn`,
            'userSettingsBtn',
            `My settings`
        );

        const profileBtn = createElement(
            'button',
            `userSettingsBtn`,
            'userSettingsBtn',
            `My settings`
        );
        userSettingsContainer.append(userSettingsBtn, profileBtn)
        

        // const loginUserPage = createElement(
        //     'button',
        //     `loginUserPage`,
        //     'loginUserPage',
        //     ``
        // );
        // mainContainer.appendChild(loginUserPage)

        // const welcomeUserHeadin = document.createElement('h2')
        // // getUserOrders()
        // welcomeUserHeadin.innerText = `Welcome ${localStorage.getItem('loggedInUserName')}`
        // loginUserPage.appendChild(welcomeUserHeadin)

        const logoutBtn = createElement(
            'button',
            `logoutBtn`,
            'logoutBtn',
            `Sign out`
        );
        
		navBar.appendChild(logoutBtn);

        logoutBtn.addEventListener('click', logoutUser)

	} else {
		//Not logged in
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
        passwordInput.type = 'password'
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