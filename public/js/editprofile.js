const nameInput = document.querySelector('#name')
const ageInput = document.querySelector('#age')
const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const editForm = document.querySelector('#editForm')

fetch(`http://localhost:3000/users/me`, {
    credentials: 'include'
}).then((response) => {
    response.json().then((data) => {
        nameInput.value = `${data.name}`
        ageInput.value = `${data.age}`
        emailInput.value = `${data.email}`
    })
});


editForm.addEventListener('submit', postData);

function postData(event) {
    event.preventDefault()

    const name = nameInput.value
    const age = ageInput.value
    const email = emailInput.value
    const password = passwordInput.value


    if (!password) {
        fetch('http://localhost:3000/users/me', {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ name: name, age: age, email: email })
        }).then((response) => {
            response.json().then((data) => {
                window.location.href = 'http://localhost:3000/profile';
            })
        });
    } else {
        fetch('http://localhost:3000/users/me', {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ name: name, age: age, email: email, password: password })
        }).then((response) => {
            response.json().then((data) => {
                window.location.href = 'http://localhost:3000/profile';
            })
        });
    }
}



//Uploading an image for avatar

const pictureForm = document.querySelector('#imageForm')
pictureForm.addEventListener('submit', uploadPicture)

function uploadPicture(event) {
    
    event.preventDefault()
    
    fetch(`http://localhost:3000/users/me/avatar`, {
        method: 'POST',
        credentials: 'include',
        body: new FormData(pictureForm)
    }).then((response) => {
        window.location.href = 'http://localhost:3000/profile';
    });

}





