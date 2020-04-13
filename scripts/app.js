import { FormSubmit } from './modules/FormSubmit.js';
import { Notification } from './modules/Notification.js';
import { getLocalStorage } from './modules/storageData.js';

const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');
const loginBtn = document.querySelector('.login-btn');
const registerBtn = document.querySelector('.register-btn');
const notification = document.querySelector('.notification');
const loginFormValue = {}, registerFormValue = {};
let loggedInStatus;
const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const loginEmailRequiredErrorTag = document.querySelector('.login-emailId-required');
const loginEmailInvalidErrorTag = document.querySelector('.login-emailId-valid');
const loginPasswordRequiredErrorTag = document.querySelector('.login-password-required');
const loginPasswordInvalidErrorTag = document.querySelector('.login-password-valid');
const registerEmailRequiredErrorTag = document.querySelector('.register-emailId-required');
const registerEmailInvalidErrorTag = document.querySelector('.register-emailId-valid');
const registerPasswordRequiredErrorTag = document.querySelector('.register-password-required');
const registerPasswordInvalidErrorTag = document.querySelector('.register-password-valid');
const registerRePasswordRequiredErrorTag = document.querySelector('.register-re-password-required');
const registerRePasswordInvalidErrorTag = document.querySelector('.register-re-password-valid');

//Declare JSON structure for forms
window.addEventListener('DOMContentLoaded', (e) => {
    if (!getLocalStorage('users')) {
        Notification(notification, false, 'No users are exist. Please register', true);
    }
    const inputTags = loginForm.elements || [];
    for (let inputTag of inputTags) {
        if (inputTag[`tagName`].toLowerCase() === 'input') {
            loginFormValue[inputTag[`name`]] = {
                value: '',
                validators: {
                    required: false,
                    invalid: false
                }
            };
        }
    }
});

//Login form validation on click of submit
loginBtn.addEventListener('click', (e) => {
    const inputTags = loginForm.elements || [];
    let formData = {};
    for (let inputTag of inputTags) {
        if (inputTag[`tagName`].toLowerCase() === 'input' && inputTag.value.length === 0) {
            loginFormValue[inputTag[`name`]].validators = {
                required: true,
                invalid: false
            };
            if (inputTag[`name`] === 'emailId') {
                loginEmailRequiredErrorTag.classList.remove('hide');
                loginEmailInvalidErrorTag.classList.remove('hide');
            } else {
                loginPasswordRequiredErrorTag.classList.remove('hide');
            }
        } else if (inputTag[`tagName`].toLowerCase() === 'input' && inputTag.name === 'emailId' && !inputTag.value.match(emailRegExp)) {
            loginFormValue[inputTag[`name`]].validators = {
                required: false,
                invalid: true
            };
            loginEmailRequiredErrorTag.classList.add('hide');
            loginEmailInvalidErrorTag.classList.remove('hide');
            if(loginPasswordRequiredErrorTag.classList.contains('hide') && loginPasswordInvalidErrorTag.classList.contains('hide')){
                loginPasswordInvalidErrorTag.classList.add('hide');
                loginPasswordRequiredErrorTag.classList.add('hide');
            }
        } else if (inputTag[`tagName`].toLowerCase() === 'input' && inputTag.name === 'password' && inputTag.value.length < 5) {
            loginFormValue[inputTag[`name`]].validators = {
                required: false,
                invalid: true
            };
            loginPasswordRequiredErrorTag.classList.add('hide');
            loginPasswordInvalidErrorTag.classList.remove('hide');
            if(loginEmailRequiredErrorTag.classList.contains('hide') && loginEmailInvalidErrorTag.classList.contains('hide')){
                loginEmailInvalidErrorTag.classList.add('hide');
                loginEmailRequiredErrorTag.classList.add('hide');
            }
            return;
        } else {
            loginFormValue[inputTag[`name`]] = {
                value: inputTag.value,
                validators: {
                    required: false,
                    invalid: false
                }
            }
            if(inputTag[`name`] === 'emailId' && (loginEmailInvalidErrorTag.classList.contains('hide') || loginEmailRequiredErrorTag.classList.contains('hide'))){
                loginEmailInvalidErrorTag.classList.add('hide');
                loginEmailRequiredErrorTag.classList.add('hide');
            } else {
                loginPasswordInvalidErrorTag.classList.add('hide');
                loginPasswordRequiredErrorTag.classList.add('hide');
            }
            for (let key in loginFormValue) {
                let formKeys = loginFormValue[key];
                formData[key] = formKeys[`value`];
            }
            let formValues = Object.values(formData);
            if (formValues.every((value) => value.length !== 0)) {
                loggedInStatus = FormSubmit(formData, 'login', e);
                if (loggedInStatus) {
                    if(!notification.childNodes.length){
                        Notification(notification, loggedInStatus, 'Successfully Logged in :). Redirecting to dashboard', true);
                        window.location.pathname = '/views/dashboard.html';
                    }
                } else {
                    if(!notification.childNodes.length){
                        Notification(notification, loggedInStatus, 'Login failed. Credentials are Invalid :(', true);
                    }
                }
            }
        }
    }
});
//Register form validation on click of submit
registerBtn.addEventListener('click', (e) => {
    const inputTags = registerForm.elements || [];
    let formData = {};
    for (let inputTag of inputTags) {
        if (inputTag[`tagName`].toLowerCase() === 'input' && inputTag.value.length === 0) {
            registerFormValue[inputTag[`name`]].validators = {
                required: true,
                invalid: false
            };
            if (inputTag[`name`] === 'emailId') {
                registerEmailRequiredErrorTag.classList.remove('hide');
                registerPasswordRequiredErrorTag.classList.remove('hide');
                registerRePasswordRequiredErrorTag.classList.remove('hide');
            } else if (inputTag[`name`] === 'password') {
                registerPasswordRequiredErrorTag.classList.remove('hide');
                registerRePasswordRequiredErrorTag.classList.remove('hide');
            } else {
                registerRePasswordRequiredErrorTag.classList.remove('hide');
            }
        } else if (inputTag[`tagName`].toLowerCase() === 'input' && inputTag.name === 'emailId' && !inputTag.value.match(emailRegExp)) {
            registerFormValue[inputTag[`name`]].validators = {
                required: false,
                invalid: true
            };
            registerEmailInvalidErrorTag.classList.remove('hide');
            return;
        } else if (inputTag[`tagName`].toLowerCase() === 'input' && inputTag.name === 'password' && inputTag.value.length < 5) {
            registerFormValue[inputTag[`name`]].validators = {
                required: false,
                invalid: true
            };
            registerPasswordInvalidErrorTag.classList.remove('hide');
            return;
        } else if (inputTag[`tagName`].toLowerCase() === 'input' && inputTag.name === 'rePassword' && inputTag.value.length < 5) {
            registerFormValue[inputTag[`name`]].validators = {
                required: false,
                invalid: true
            };
            registerPasswordInvalidErrorTag.classList.remove('hide');
        } else {
            registerFormValue[inputTag[`name`]] = {
                value: inputTag.value,
                validators: {
                    required: false,
                    invalid: false
                }
            }
            for (let key in registerFormValue) {
                let formKeys = registerFormValue[key];
                formData[key] = formKeys[`value`];
            }
            if (formData[`password`] !== formData[`rePassword`] && inputTag.name === 'rePassword') {
                if(notification.childNodes.length === 0){
                    Notification(notification, false, 'register', 'Passwords not match');
                }
            } else {
                let values = Object.values(formData);
                if(values.every((value) => value.length !== 0)){
                    loggedInStatus = FormSubmit(formData, 'register', e);
                    if (loggedInStatus) {
                        if(notification.childNodes.length === 0){
                            Notification(notification, loggedInStatus, 'Successfully registered :)');
                            window.location.pathname ="/views/dashboard.html";
                        }
                    } else {
                        if(notification.childNodes.length === 0){
                            Notification(notification, loggedInStatus, 'Failed to register. Please try with other credentails');
                        }
                    }    
                }
            }
        }
    }   
});
//Tabs of login and register switching
function tabify(element) {
    const header = element.querySelector('.tabs-header');
    const content = element.querySelector('.tabs');
    const tab_headers = [...header.children];
    const tab_contents = [...content.children];
    let default_tab_index;
    tab_contents.forEach(x => x.style.display = 'none');
    let current_tab_index = -1;

    function setTab(index) {
        if (current_tab_index > -1) {
            tab_contents[current_tab_index].style.display = 'none';
        }
        if (index !== current_tab_index && Object.keys(registerFormValue).length === 0) {
            generateRegisterFormStructure();
        }
        tab_contents[index].style.display = 'flex';
        current_tab_index = index;
    }

    default_tab_index = tab_headers.findIndex(x => {
        return [...x.classList].indexOf('default-tab') > -1;
    });

    default_tab_index = default_tab_index === -1 ? 0 : default_tab_index;
    setTab(default_tab_index);
    tab_headers.forEach((x, i) => {
        x.onclick = event => {
            if (event.target.nextElementSibling && event.target.nextElementSibling.classList.contains('default-tab')) {
                event.target.nextElementSibling.classList.remove('default-tab');
            } else if (event.target.previousElementSibling && event.target.previousElementSibling.classList.contains('default-tab')) {
                event.target.previousElementSibling.classList.remove('default-tab');
            } else if (!event.target.parentNode.classList.contains('default-tab')) {
                event.target.parentNode.classList.add('default-tab');
            }
            event.target.classList.add('default-tab');
            setTab(i, event);
        }
    });
}
[...document.querySelectorAll('.tabs-container')]
    .forEach(x => tabify(x));

    // declaration of register form structure
function generateRegisterFormStructure() {
    const inputTags = registerForm.elements || [];
    for (let inputTag of inputTags) {
        if (inputTag[`tagName`].toLowerCase() === 'input' || inputTag[`tagName`].toLowerCase() === 'select') {
            registerFormValue[inputTag[`name`]] = {
                value: '',
                validators: {
                    required: false,
                    invalid: false
                }
            };
        }
    }
}