const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    event_title: {
        type: String,
        required: true
    },
    hosted_by: {
        type: String,
        required: true
    },
    event_image: {
        type: String,
        required: true
    },
    event_type: {
        type: String,
        enum: ['Offline', 'Online', 'Both'],
        required: true
    },
    date_time: {
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        }
    },
    location: {
        venue: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    price: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    additional_information: {
        dress_code: {
            type: String,
            required: false
        },
        age_restrictions: {
            type: String,
            required: false
        }
    },
    event_tags: {
        type: [String],
        required: true
    },
    speakers: [{
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    }]
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
