import checkLoginState from "./checkLoginState.mjs";

export default function logoutUser() {
    localStorage.clear();
    checkLoginState()
}