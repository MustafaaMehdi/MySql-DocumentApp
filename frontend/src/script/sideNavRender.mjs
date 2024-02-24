let navBar = document.getElementById('navBar');
import createElement from "../lib/createElement.mjs"
import newDocument from "./newDocument.mjs";
import myDocuments from "./myDocuments.mjs";
import getUserProfile from "./getUserProfile.mjs";
import logoutUser from './logoutUser.mjs';

export default function sideNavRender() {


    let logoContainer = createElement(
        'div',
        `logoContainer`,
        'logoContainer',
        ``
    );
    navBar.appendChild(logoContainer)

    let logoContainerImg = createElement(
        'img',
        `logoContainerImg`,
        'logoContainerImg',
        ``
    );

    let logoText = createElement(
        'h2',
        `logoText`,
        'logoText',
        `UniDoc`
    );
    
    logoContainerImg.setAttribute('src', './assets/logo/logo.png')
    logoContainerImg.setAttribute('alt', 'logo of unidoc')
    logoContainerImg.setAttribute('width', '50')
    logoContainer.append(logoContainerImg, logoText)

    let menuBtn = createElement(
        'span',
        `menuBtn`,
        'bx bx-right-arrow-alt menuBtn',
        ``
    );
    navBar.appendChild(menuBtn)

    let userSettingsContainer = createElement(
        'section',
        `userSettingsContainer`,
        'userSettingsContainer',
        ``
    );
    navBar.appendChild(userSettingsContainer)

    // let userSettingsBtn = createElement(
    //     'button',
    //     `userSettingsBtn`,
    //     'userSettingsBtn',
    //     `Settings`
    // );

    let profileImg = createElement(
        'img',
        `profileImg`,
        'profileImg',
        ``
    );
    profileImg.setAttribute('src', './assets/images/avatar.jpg')
    profileImg.setAttribute('alt', 'logo of unidoc')
    profileImg.setAttribute('width', '50')

    let profileName = createElement(
        'p',
        `profileName`,
        'profileName',
        `${localStorage.getItem('loggedInUserName')}`
    );

    let profileBtn = createElement(
        'button',
        `userProfileBtn`,
        'bx bx-user-circle userProfileBtn',
        ``
    );

    let profileBtnTitle = createElement(
        'p',
        `profileBtnTitle`,
        'profileBtnTitle btnTitle',
        `My profile`
    );
    let profileBtnTip = createElement(
        'p',
        `profileBtnTip`,
        'profileBtnTip',
        `My profile`
    );
    profileBtn.append(profileBtnTitle, profileBtnTip)
    
    
    userSettingsContainer.append(profileImg, profileName, profileBtn)

    let documentBtnContainer = createElement(
        'section',
        `documentBtnContainer`,
        'documentBtnContainer',
        ``
    );
    navBar.appendChild(documentBtnContainer)

    let myDocumentsBtn = createElement(
        'button',
        `myDocumentsBtn`,
        'bx bxs-file myDocumentsBtn',
        ``
    );
    let myDocumentsBtnTitle = createElement(
        'p',
        `myDocumentsBtnTitle`,
        'myDocumentsBtnTitle btnTitle',
        `My documents`
    );
    let myDocumentsBtnTip = createElement(
        'p',
        `myDocumentsBtnTip`,
        'myDocumentsBtnTip toolTip',
        `My documents`
    );
    myDocumentsBtn.append(myDocumentsBtnTip, myDocumentsBtnTitle)

    let createDocumentBtn = createElement(
        'button',
        `createDocumentBtn`,
        'bx bxs-file-plus createDocumentBtn',
        ``
    );    
    let createDocumentBtnTitle = createElement(
        'p',
        `myDocumentsBtnTitle`,
        'createDocumentBtnTitle btnTitle',
        `Create document`
    );
    let createDocumentBtnTip = createElement(
        'p',
        `myDocumentsBtnTip`,
        'createDocumentBtnTip',
        `Create documents`
    );
    createDocumentBtn.append(createDocumentBtnTip, createDocumentBtnTitle)


    documentBtnContainer.append(createDocumentBtn, myDocumentsBtn)

  
    
        const logoutBtn = createElement(
            'button',
            `logoutBtn`,
            'bx bx-log-out-circle logoutBtn',
            ``
        );

    navBar.appendChild(logoutBtn)
    menuBtn.addEventListener('click', () => {
        navBar.classList.toggle('openMenu')
    })
    myDocumentsBtn.addEventListener('click', myDocuments)
    
    createDocumentBtn.addEventListener('click', newDocument)

    profileBtn.addEventListener('click', getUserProfile)
    logoutBtn.addEventListener('click', logoutUser);

}