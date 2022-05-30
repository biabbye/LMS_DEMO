const Group = require('../Models/Group');

exports.create = async (req,res) =>{
    const { group} = req.body;
    console.log(req.body);
    try {

        const groupExists = await Group.findOne({group});
        if(groupExists) {
            return res.status(400).json({
                errorMessage: `${group} already created.`,
            });
        }
        
        let createdGroup = new Group();
        createdGroup.group = group;

        createdGroup = await createdGroup.save();

        res.status(200).json({
            group: createdGroup,
            successMessage: `${createdGroup.group} was created!`
        })
    } catch (error) {
        console.log('Group create error', error);
        res.status(500).json({
            errorMessage: 'Please try again later.',
        });
    }
};

exports.readAll = async (req,res) =>{
    
    try {
        const groups = await Group.find({});
        res.status(200).json({
            groups
        });
    } catch (error) {
        console.log('Group read error', error);
        res.status(500).json({
            errorMessage: 'Please try again later.',
        });
    }
};