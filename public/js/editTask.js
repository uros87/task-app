const value = window.location.pathname
const str = value.split('/')
const id = str.pop() || str.pop()

const holderDiv = document.querySelector('.task')
const descriptionField = document.querySelector('#description')
const completedField = document.querySelector('#completed')
const editForm = document.querySelector('#editForm')


//fetching task
fetch(`http://localhost:3000/tasks/${id}`, {
    credentials: 'include'
}).then((response) => {
    response.json().then((data) => {
        descriptionField.value = `${data.description}`
        completedField.value = `${data.completed}`
    })
});


//submitting edited task
editForm.addEventListener('submit', postData)

function postData(event) {
    event.preventDefault()
    
    const description = descriptionField.value
    const completed = completedField.value

    fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ description: description, completed: completed })
        }).then((response) => {
            response.json().then((data) => {
                console.log(data)
                window.location.href = 'http://localhost:3000/profile';
            })
        });
}

//deleting a task
const deleteButton = document.querySelector('#deleteTask')
deleteButton.addEventListener('click', function(){
    fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
    }).then((response) => {
        window.location.href = 'http://localhost:3000/profile';
    });
})
