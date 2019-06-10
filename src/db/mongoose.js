const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uroseva-baza', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});



