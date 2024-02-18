import checkLoginState from "./checkLoginState.js";

export default function logoutUser() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInUserName');

    checkLoginState()
}