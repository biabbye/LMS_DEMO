const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const AssignmentSchema = new mongoose.Schema(
    {
        assignmentName: {
            type: String,
          
        },
        assignmentDescription: {
            type: String,
        },
        assignmentStatus: {
            type: String,
            default:'Active'
        },
        assignmentGroup: {
            type: ObjectId,
            ref: 'Group',
        
        },
    },
    { timestamps: true }
);

AssignmentSchema.index({assignmentName: 'text'});
const Assignment = mongoose.model('Assignment', AssignmentSchema);

module.exports = Assignment;