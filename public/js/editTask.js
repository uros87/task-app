const value = window.location.pathname
const str = value.split('/')
const id = str.pop() || str.pop()

const holderDiv = document.querySelector('.task')
const descriptionField = document.querySelector('#description')
const completedField = document.querySelector('#completed')
const editForm = document.querySelector('#editForm')


//fetching task
fetch(`/tasks/${id}`, {
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

    fetch(`/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ description: description, completed: completed })
        }).then((response) => {
            response.json().then((data) => {
                console.log(data)
                window.location.href = '/profile';
            })
        });
}

//deleting a task
const deleteButton = document.querySelector('#deleteTask')
deleteButton.addEventListener('click', function(){
    fetch(`/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
    }).then((response) => {
        window.location.href = '/profile';
    });
})
