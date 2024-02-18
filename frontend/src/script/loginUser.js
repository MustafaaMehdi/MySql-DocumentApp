import checkLoginState from "./checkLoginState.js";

export default function loginUser() {
    console.log('Login');
    let sendUser = {
		userEmail: emailInput.value,
		password: passwordInput.value,
	};

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
                checkLoginState()
			} else {
				console.log('STOP wrong user data');
			}
		});
}