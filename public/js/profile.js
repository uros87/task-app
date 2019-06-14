// var skip = parseInt(sessionStorage.getItem('skip'));
// let numberOfTasks;
// let numberOfPages;

// var userID;

//fetching user profile

const getProfile = function () {
    const name = document.querySelector('.profile__name')
    const age = document.querySelector('.age')
    const email = document.querySelector('.email')

    fetch(`/users/me`, {
        credentials: 'include'
    }).then((response) => {
        response.json().then((data) => {
            userID = data._id;
            // console.log(userID)
            name.textContent = `${data.name}`
            // email.textContent = `Email: ${data.email}`

            //fething user avatar

            const avatar = function () {
                const imageDiv = document.querySelector('.profile')


                fetch(`/users/${userID}/avatar`, {
                    credentials: 'include',
                }).then((response) => {
                    return response.blob()
                }).then((myBlob) => {
                    if(myBlob.size !== 0){
                        var objectURL = URL.createObjectURL(myBlob);
                        const image = document.querySelector('.image')
                        image.src = objectURL    
                    }else{
                        const image = document.querySelector('.image')
                        image.src = '../images/Default-avatar.png'
                    }
                    
                })
            }
            avatar()
        })
    });
}

getProfile()



//Create task

const createTask = function () {
    const createTask = document.querySelector('.form')
    const descriptionInput = document.querySelector('.form__input--taskdescription')

    createTask.addEventListener('submit', postData);

    function postData(event) {
        event.preventDefault()

        const description = descriptionInput.value

        fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ description: description })
        }).then((response) => {
            response.json().then((data) => {

                let node = document.createElement('DIV')

                let taskDecriptionDiv = document.createElement('DIV')
                let pTaskNodeDiv = document.createElement('DIV')
                pTaskNodeDiv.innerHTML = 'Decsription:'
                let pTaskNode = document.createElement('DIV')

                let taskStatusDiv = document.createElement('DIV')
                pTaskNode.classList.add('taskdescription')
                let pCompletedNodeDiv = document.createElement('DIV')
                pCompletedNodeDiv.innerHTML = 'Status:'
                let pCompletedNode = document.createElement('DIV')

                pCompletedNode.classList.add('taskcompletion')
                pTaskNode.innerHTML = `${data.description}`
                pCompletedNode.innerHTML = `uncompleted`


                taskDecriptionDiv.appendChild(pTaskNodeDiv)
                taskDecriptionDiv.appendChild(pTaskNode)
                taskStatusDiv.appendChild(pCompletedNodeDiv)
                taskStatusDiv.appendChild(pCompletedNode)

                node.appendChild(taskDecriptionDiv)
                node.appendChild(taskStatusDiv)

                node.classList.add('task')
                document.getElementById('tasklist').appendChild(node)

                //adding a button for going to edit task page
                let editButton = document.createElement('BUTTON')
                editButton.innerHTML = `Edit task`
                node.appendChild(editButton)

                document.getElementById('tasklist').appendChild(node)

                createTask.reset()

                editButton.addEventListener('click', function () {
                    window.location.href = `/editTask/${data._id}`;
                    // window.location.href = `http://localhost:3000/tasks/${task._id}`;
                    // console.log(task._id)
                })
            })
        });
    }
}
createTask()


//fetching tasks

const fetchingTasks = function (skip = 0) {
    fetch(`/tasks?limit=5&skip=${skip}`, {
        credentials: 'include'
    }).then((response) => {
        response.json().then((data) => {

            data.forEach((task) => {
                let node = document.createElement('DIV')

                let taskDecriptionDiv = document.createElement('DIV')
                let pTaskNodeDiv = document.createElement('DIV')
                pTaskNodeDiv.innerHTML = 'Decsription:'
                let pTaskNode = document.createElement('DIV')
                pTaskNode.classList.add('taskdescription')

                let taskStatusDiv = document.createElement('DIV')
                let pCompletedNodeDiv = document.createElement('DIV')
                pCompletedNodeDiv.innerHTML = 'Status:'
                let pCompletedNode = document.createElement('DIV')
                pCompletedNode.classList.add('taskcompletion')

                if (task.completed === true) {
                    pCompletedNode.innerHTML = 'completed'

                } else {
                    pCompletedNode.innerHTML = 'uncompleted'
                }

                node.classList.add('task')

                taskDecriptionDiv.appendChild(pTaskNodeDiv)
                taskDecriptionDiv.appendChild(pTaskNode)
                taskStatusDiv.appendChild(pCompletedNodeDiv)
                taskStatusDiv.appendChild(pCompletedNode)

                node.appendChild(taskDecriptionDiv)
                node.appendChild(taskStatusDiv)
                pTaskNode.innerHTML = `${task.description}`

                //adding a button for going to edit task page
                let editButton = document.createElement('BUTTON')
                editButton.innerHTML = `Edit task`
                node.appendChild(editButton)

                document.getElementById('tasklist').appendChild(node)

                editButton.addEventListener('click', function () {
                    window.location.href = `/editTask/${task._id}`;
                    // window.location.href = `http://localhost:3000/tasks/${task._id}`;
                    // console.log(task._id)
                })
            })
        })
    });
}

fetchingTasks()

//fetching tasks just for number of tasks

const fetchingTasksForNumber = function (skip = 0) {
    fetch(`/tasks?limit=0&skip=0`, {
        credentials: 'include'
    }).then((response) => {
        response.json().then((data) => {
            numberOfTasks = data.length
            // console.log(numberOfTasks)
            numberOfPages = Math.ceil(numberOfTasks / 5)
            // console.log(numberOfPages)

            for (let i = 0; i < numberOfPages; i++) {

                let node = document.createElement('DIV')
                let button = document.createElement('BUTTON')
                button.innerHTML = `${i + 1}`
                button.classList.add('pageNumber')
                node.appendChild(button)
                let skipValue = i * 5;
                button.addEventListener('click', () => {
                    document.getElementById('tasklist').innerHTML = ''

                    fetch(`/tasks?limit=5&skip=${skipValue}`, {
                        credentials: 'include'
                    }).then((response) => {
                        response.json().then((data) => {
                            console.log(data)
                            //
                            data.forEach((task) => {
                                let node = document.createElement('DIV')

                                let taskDecriptionDiv = document.createElement('DIV')
                                let pTaskNodeDiv = document.createElement('DIV')
                                pTaskNodeDiv.innerHTML = 'Decsription:'
                                let pTaskNode = document.createElement('DIV')
                                pTaskNode.classList.add('taskdescription')

                                let taskStatusDiv = document.createElement('DIV')
                                let pCompletedNodeDiv = document.createElement('DIV')
                                pCompletedNodeDiv.innerHTML = 'Status:'
                                let pCompletedNode = document.createElement('DIV')
                                pCompletedNode.classList.add('taskcompletion')

                                if (task.completed === true) {
                                    pCompletedNode.innerHTML = 'completed'

                                } else {
                                    pCompletedNode.innerHTML = 'uncompleted'
                                }

                                node.classList.add('task')

                                taskDecriptionDiv.appendChild(pTaskNodeDiv)
                                taskDecriptionDiv.appendChild(pTaskNode)
                                taskStatusDiv.appendChild(pCompletedNodeDiv)
                                taskStatusDiv.appendChild(pCompletedNode)

                                node.appendChild(taskDecriptionDiv)
                                node.appendChild(taskStatusDiv)
                                pTaskNode.innerHTML = `${task.description}`

                                
                                let editButton = document.createElement('BUTTON')
                                editButton.innerHTML = `Edit task`
                                node.appendChild(editButton)

                                document.getElementById('tasklist').appendChild(node)

                                editButton.addEventListener('click', function () {
                                    window.location.href = `/editTask/${task._id}`;
                                    // window.location.href = `http://localhost:3000/tasks/${task._id}`;
                                    console.log(task._id)
                                })
                            })
                            //
                        })
                    })
                    console.log(i)
                })

                document.getElementById('footer__pages').appendChild(node)
            }
        })
    })
};

fetchingTasksForNumber()



//logout


const logoOut = function () {
    const button = document.getElementById('logout')
    button.addEventListener('click', function () {
        fetch('/users/logout', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
        }).then((response) => {
            window.location.href = '/'
        })
    })
}

logoOut()

//editProfile

const editProfile = function () {
    const editProfileButton = document.getElementById('edit')
    editProfileButton.addEventListener('click', () => {
        window.location.href = '/editprofile'
    })

}
editProfile()





