const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
    skills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill'
    }],

    startTime: {
        type:mongoose.Schema.Types.Date,
        required:true
    
    },
    endTime: {
        type:mongoose.Schema.Types.Date,
        required:true
    },
    assignedTo :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }   


});

const Shift = mongoose.model('Shift', shiftSchema);

module.exports = Shift;