import createElement from "./createElement.js";

export default function registerAccount(signUpNameInput, signUpEmailInput, signUpPasswordInput) {
    let sendUser = {
		userName: signUpNameInput.value,
		userEmail: signUpEmailInput.value,
		password: signUpPasswordInput.value
	};
    let checkError = document.getElementById('nameError')
    if (checkError) {
        checkError.remove()
    }
    const nameError = createElement(
        'span',
        `nameError`,
        'nameError',
        ``
    );
    console.log(signUpNameInput.value);
    if (signUpNameInput.value.trim() === '' || signUpEmailInput.value.trim() === ''|| signUpPasswordInput.value.trim() === '' ) {
        nameError.innerText = 'Please fill in all the details'
        loginContainer.appendChild(nameError)
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
                nameError.innerText = 'E-mail address already in use, please reset password'
                loginContainer.appendChild(nameError)
                return;
            } else if (res.status === 500) {
                nameError.innerText = 'There was an error creating user, please try again'
                loginContainer.appendChild(nameError)
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