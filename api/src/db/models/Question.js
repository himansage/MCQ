const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: String,
    description: String,
    choices: [
        {
            id: String,
            text: String,
            isCorrect: Boolean
        }
    ]
});

module.exports = mongoose.model('Question', questionSchema);