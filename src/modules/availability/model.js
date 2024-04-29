const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    availability: [{
            startTime: {
                type:mongoose.Schema.Types.Date,
                required:true
            
            },
            endTime: {
                type:mongoose.Schema.Types.Date,
                required:true
            }   
    }]
});

const Availability = mongoose.model('Availability', availabilitySchema);

module.exports = Availability;
