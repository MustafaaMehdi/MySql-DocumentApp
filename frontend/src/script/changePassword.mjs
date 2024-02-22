import createElement from '../lib/createElement.mjs';
import getUserProfile from './getUserProfile.mjs';
import updatePassword from './updatePassword.mjs';

export default function changePassword(userProfileContainer) {
	userProfileContainer.innerText = '';
	let changePasswordHeading = createElement(
		'h2',
		`userProfileHeading`,
		'userProfileHeading',
		`Change password`
	);
	let currentPasswordLabel = createElement(
		'label',
		'currentPasswordLabel',
		'currentPasswordLabel',
		'Current password: '
	);
	let currentPasswordInput = createElement(
		'input',
		'currentPasswordInput',
		'currentPasswordInput',
		''
	);
	currentPasswordLabel.appendChild(currentPasswordInput);
	let newPasswordLabel = createElement(
		'label',
		'newPasswordLabel',
		'newPasswordLabel',
		'Type new password: '
	);
	let newPasswordInput = createElement(
		'input',
		'newPasswordInput',
		'newPasswordInput',
		''
	);
	newPasswordLabel.appendChild(newPasswordInput);
	let newPasswordLabel2 = createElement(
		'label',
		'newPasswordLabel2',
		'newPasswordLabel2',
		'Re-type new password: '
	);
	let newPasswordInput2 = createElement(
		'input',
		'newPasswordInput2',
		'newPasswordInput2',
		''
	);
	newPasswordLabel2.appendChild(newPasswordInput2);
    
    let changePasswordBtn = createElement(
		'button',
		'changePasswordBtn',
		'changePasswordBtn',
		'Change password'
	);

    let cancelBtn = createElement(
		'button',
		'cancelBtn',
		'cancelBtn',
		'Cancel'
	);

	userProfileContainer.append(
		changePasswordHeading,
		currentPasswordLabel,
		newPasswordLabel,
		newPasswordLabel2,
        changePasswordBtn,
        cancelBtn
	);

    cancelBtn.addEventListener('click', getUserProfile)

    changePasswordBtn.addEventListener('click', () => updatePassword(currentPasswordInput, newPasswordInput, newPasswordInput2, userProfileContainer))
}
