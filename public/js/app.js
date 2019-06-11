//for creating a new user
const createUserForm = document.querySelector('.createuser');
const nameInput = document.querySelector('.name')
const emailInput = document.querySelector('.e-mail')
const passwordInput = document.querySelector('.password')
const existingUser = document.querySelector('.userexists') 

createUserForm.addEventListener('submit', postData);

function postData(event) {
    event.preventDefault()

    const name = nameInput.value
    const email = emailInput.value
    const password = passwordInput.value

    fetch('/users', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({name: name, email: email, password: password })
    }).then((response) => {
        response.json().then((data) => {
            console.log(data.token)
            document.cookie = `${data.token}`;
            window.location.href = 'https://brkic-task-app.herokuapp.com/profile';
        }).catch((e) => {
            console.log('existing')
            existingUser.innerHTML = 'Bad or existing username'
        })
    });
    
}

//for logging in
const createUserFormLogin = document.querySelector('.loginuser');
const emailInputLogin = document.querySelector('.e-mail-login')
const passwordInputLogin = document.querySelector('.password-login')
const badlog = document.querySelector('.badcredentials')

createUserFormLogin.addEventListener('submit', postDatalogin);

function postDatalogin(event) {
    event.preventDefault()

    const email = emailInputLogin.value
    const password = passwordInputLogin.value

    fetch('https://brkic-task-app.herokuapp.com/users/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: email, password: password })
    }).then((response) => {
        response.json().then((data) => {
            console.log(data.token)
            document.cookie = `${data.token}`;
            window.location.href = 'https://brkic-task-app.herokuapp.com/profile';
        }).catch((e) => {
            badlog.innerHTML = 'Wrong username or password'
        })
    });
}
