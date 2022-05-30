const Assignment = require('../Models/Assignment');

exports.create = async (req,res) => {
    
	
    const assignmentName = req.body.assignmentData.assignmentName;
	const assignmentDescription = req.body.assignmentData.assignmentDescription;
	const assignmentGroup = req.body.assignmentData.assignmentGroup;

	
	
    try {
        let newAssignment = new Assignment();

	
		newAssignment.assignmentName = assignmentName;
		newAssignment.assignmentDescription = assignmentDescription;
		newAssignment.assignmentGroup = assignmentGroup;

		

		await newAssignment.save();

		res.status(200).json({
			successMessage: `${assignmentName} was created`,
			newAssignment,
		});
    } catch (error) {
        console.log(error, 'assignmentController.create error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
    }
}

exports.readAll = async (req,res) => {
    
    // const assignmentName = req.body.assignmentData.assignmentName;
	// const assignmentDescription = req.body.assignmentData.assignmentDescription;
	// const assignmentGroup = req.body.assignmentData.assignmentGroup;
	
    try {
       const assignments = await Assignment.find({}).populate('assignmentGroup', 'group');
	   res.json({assignments});

    } catch (error) {
        console.log(error, 'assignmentController.readAll error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
    }
}