const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema( {
    group: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;