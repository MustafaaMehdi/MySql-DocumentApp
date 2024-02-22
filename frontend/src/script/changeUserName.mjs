import createElement from "../lib/createElement.mjs";
import getUserProfile from "./getUserProfile.mjs";
import updateProfile from "./updateProfile.mjs";

export default function changeUserName(userProfileContainer, user) {
    userProfileContainer.innerText = ''

    let nameLabel = createElement(
        'label',
        `nameLabel`,
        'nameLabel',
        `Name: `
    );
    userProfileContainer.appendChild(nameLabel)
    let nameInput = createElement(
        'input',
        `nameInput`,
        'nameInput',
        ``
    );
    nameInput.value = user.name
    nameLabel.appendChild(nameInput)


    let updateProfileBtn = createElement(
        'Button',
        `updateProfileBtn`,
        'updateProfileBtn',
        `Update profile`
    );
    let cancelBtn = createElement(
        'Button',
        `cancelBtn`,
        'cancelBtn',
        `Cancel`
    );
    
    userProfileContainer.append(updateProfileBtn, cancelBtn)

    cancelBtn.addEventListener('click', getUserProfile)

    updateProfileBtn.addEventListener('click', () => updateProfile(nameInput))

}