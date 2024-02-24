import createElement from "../lib/createElement.mjs";
import checkLoginState from "./checkLoginState.mjs";
import registerAccount from "./registerAccount.mjs";

export default function signUpUser() {
    loginContainer.innerText = ''
    const signUpHeading = createElement(
        'h2',
        `signUpHeading`,
        'signUpHeading',
        `Sign up`
    );
    loginContainer.appendChild(signUpHeading)
    const signUpNameLabel = createElement(
        'label',
        `signUpNameLabel`,
        'signUpNameLabel',
        `Name: `
    );
     loginContainer.appendChild(signUpNameLabel)

     const signUpNameInput = createElement(
        'input',
        `signUpNameInput`,
        'signUpNameInput',
        ``
    );
    signUpNameLabel.appendChild(signUpNameInput);

     const signUpEmailLabel = createElement(
        'label',
        `signUpEmailLabel`,
        'signUpEmailLabel',
        `E-mail: `
    );
    loginContainer.appendChild(signUpEmailLabel)

    const signUpEmailInput = createElement(
        'input',
        `signUpEmailInput`,
        'signUpEmailInput',
        ``
    );
        signUpEmailLabel.appendChild(signUpEmailInput)

        const signUpPasswordLabel = createElement(
            'label',
            `signUpPasswordLabel`,
            'signUpPasswordLabel',
            `Password: `
        );
        loginContainer.appendChild(signUpPasswordLabel)
    
        const signUpPasswordInput = createElement(
            'input',
            `signUpPasswordInput`,
            'signUpPasswordInput',
            ``
        );
        signUpPasswordLabel.appendChild(signUpPasswordInput)


        const registerBtn = createElement(
            'button',
            `registerBtn`,
            'registerBtn',
            `Sign up`
        );

    //  loginContainer.appendChild(registerBtn);

    const backToLoginBtn = createElement(
        'button',
        `backToLoginBtn`,
        'backToLoginBtn',
        `Back to login page`
    );

     loginContainer.append(registerBtn, backToLoginBtn);

     backToLoginBtn.addEventListener('click', checkLoginState)

     registerBtn.addEventListener('click', () => registerAccount(signUpNameInput, signUpEmailInput, signUpPasswordInput))
}