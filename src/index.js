const express = require('express');
require('./db/mongoose');
const hbs = require('hbs');

const path = require('path');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const clientRouter = require('./routers/client')


const app = express();
const publicDirectoryPath = path.join(__dirname, '../public')//
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const port = process.env.PORT || 3000;


const multer = require('multer');
const upload = multer({
    dest: 'images'
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath));

app.use(express.json());
app.use(userRouter)
app.use(taskRouter)
app.use(clientRouter)



app.listen(port, () => {
    console.log('Server is up on port' + port)
});
