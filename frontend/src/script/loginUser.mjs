import checkLoginState from "./checkLoginState.mjs";
import errorMsg from "../lib/errorMsg.mjs";

export default function loginUser() {
    console.log('Login');
    let sendUser = {
		userEmail: emailInput.value,
		password: passwordInput.value,
	};
    if (emailInput.value.trim() === '' || passwordInput.value.trim() === '') {
        errorMsg(loginContainer, 'Please fill in your details') 
        return;
    }
	fetch('http://localhost:3000/api/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(sendUser),
	})
		.then((res) => res.json())
		.then((user) => {
			console.log('Post user', user);
			
			if (user.id) {
				localStorage.setItem('loggedInUser', user.id);
				localStorage.setItem('loggedInUserName', user.name);
                checkLoginState(user.name)
			} else {
				errorMsg(loginContainer, 'Wrong E-mail or password') 
				return;
			}
		});
}