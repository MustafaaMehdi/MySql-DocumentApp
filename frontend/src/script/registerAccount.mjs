import createElement from "../lib/createElement.mjs";
import errorMsg from "../lib/errorMsg.mjs";

export default function registerAccount(signUpNameInput, signUpEmailInput, signUpPasswordInput) {
    let sendUser = {
		userName: signUpNameInput.value,
		userEmail: signUpEmailInput.value,
		password: signUpPasswordInput.value
	};

    if (signUpNameInput.value.trim() === '' || signUpEmailInput.value.trim() === ''|| signUpPasswordInput.value.trim() === '' ) {
        errorMsg(loginContainer, 'Please fill in all the details') 
        return;
    }
	fetch('http://localhost:3000/api/users/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(sendUser),
	})
		.then((res) => {
            if (res.status === 409) {
                errorMsg(loginContainer, 'E-mail address already in use, please reset password if you have an account') 
                return;
            } else if (res.status === 500) {
                errorMsg(loginContainer, 'There was an error creating user, please try again') 
                return;
            }
            return res.json();
        })
		.then((user) => {
            console.log(user);
            if (user === undefined || user === null) {
                return;
            }
			registerBtn.remove()
            const successMessage = createElement(
                'span',
                `successMessage`,
                'successMessage',
                `Your account was created successfully ${signUpNameInput.value}! You are all set to start documenting like never before!`
            );
            loginContainer.appendChild(successMessage)

                console.log('User is posted: ', user);
            
		})
        .catch(error => {
            console.error('error: ', error);
        });
}