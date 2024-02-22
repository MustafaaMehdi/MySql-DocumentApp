let mainContainer = document.getElementById('mainContainer');
import createElement from "../lib/createElement.mjs";
import changeUserName from "./changeUserName.mjs";
import changePassword from "./changePassword.mjs";

export default function getUserProfile() {
    mainContainer.innerText = ''
    fetch(`http://localhost:3000/api/users/profile/${localStorage.getItem('loggedInUser')}`, {
    })
    .then(res => res.json())
    .then((user) => {
        console.log(user);
        let userProfileHeading = createElement(
            'h2',
            `userProfileHeading`,
            'userProfileHeading',
            `Profile`
        );
        let userProfileContainer = createElement(
            'section',
            `userProfileContainer`,
            'userProfileContainer',
            ``
        );
        mainContainer.append(userProfileHeading, userProfileContainer)

        let profileNameLabel = createElement(
            'label',
            `profileNameLabel`,
            'profileNameLabel',
            `Name: ${user.name}`
        );

        let profileEmailLabel = createElement(
            'label',
            `profileEmailLabel`,
            'profileEmailLabel',
            `Email: ${user.email}`
        );
        userProfileContainer.append(profileNameLabel, profileEmailLabel)

        let changeNameBtn = createElement(
            'Button',
            `changeNameBtn`,
            'changeNameBtn',
            `Change`
        );
        profileNameLabel.append(changeNameBtn)

        let changePasswordBtn = createElement(
            'Button',
            `changePasswordBtn`,
            'changePasswordBtn',
            `Change password`
        );
        userProfileContainer.appendChild(changePasswordBtn)

        changeNameBtn.addEventListener('click', () => changeUserName(userProfileContainer, user))

        changePasswordBtn.addEventListener('click', () => changePassword(userProfileContainer, userProfileHeading))

    })
}