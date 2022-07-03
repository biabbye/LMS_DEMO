const Assignment = require('../Models/Assignment');
const fs = require('fs');

exports.create = async (req,res) => {
    
	const assignmentFile = req.body.assignmentData.assignmentFile;
    const assignmentName = req.body.assignmentData.assignmentName;
	const assignmentDescription = req.body.assignmentData.assignmentDescription;
	const assignmentGroup = req.body.assignmentData.assignmentGroup;

    try {
        let newAssignment = new Assignment();

		newAssignment.assignmentFile = assignmentFile;
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

exports.readOne = async (req, res) => {
	try {
		
		const assignmentId = req.params.assignmentId;
		const assignment = await Assignment.findById(assignmentId);

		res.json(assignment);
	} catch (err) {
		console.log(err, 'assignmentController.read error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

exports.delete = async (req, res) => {
	try {
		const assignmentId = req.params.assignmentId;
		const deletedAssignment = await Assignment.findByIdAndDelete(assignmentId);

		res.json(deletedAssignment);
	} catch (err) {
		console.log(err, 'assignmentController.delete error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

// exports.run = async (req, res) => {
// 	const {language = "cpp", code} = req.body;

// 	if(code=== undefined){
// 		return res.status(400).json({ success: false, error: "Empty code body"});
// 	}
	
// 	try {
// 		// need to generate a c++ file with content from the request
// 		const filepath = await generateFile(language,code);
// 		//and run the file and send the response
// 		const output = await executeCpp(filepath);
// 		return res.json({filepath,output})
// 	} catch (error) {
// 		res.status(500).json({error});
// 	}
// };