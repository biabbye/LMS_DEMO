import React,{useState,useEffect, Fragment} from 'react'
import { Link, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getAssignment} from '../../../../redux/actions/assignmentActions';
import {getGroups} from '../../../../redux/actions/groupActions';

const TeacherAssignmentEdit = ({match}) => {

    const assignmentId = match.params.assignmentId;

    const dispatch = useDispatch();
    const {assignment} = useSelector(state => state.assignments);
    const {groups} = useSelector(state => state.groups);

    const [assignmentFile, setAssignmentFile] = useState(null);
    const [assignmentName, setAssignmentName] = useState('');
    const [assignmentDescription, setAssignmentDescription] = useState('');
    const [assignmentGroup, setAssignmentGroup] = useState('');

    useEffect( () => {
        if(!assignment)
        {
            dispatch(getAssignment(assignmentId));
            dispatch(getGroups());
        }else
        {
            setAssignmentFile(assignment.assignmentFile);
            setAssignmentName(assignment.assignmentName);
            setAssignmentDescription(assignment.assignmentDescription);
            setAssignmentGroup(assignment.assignmentGroup);
        }
        
    },[dispatch,assignmentId,assignment]);

    const handleAssignemntFileUpload = e => 
    {
        const file = e.target.files[0];
        setAssignmentFile(file);
    };

    const handleAssignmentSubmit = async e => {
        e.preventDefault();

    }


    return (

        

        
        <Fragment>
			
       
			<div className='container-fluid justify-content-center'>
				<div className='row justify-content-center '>
					<div className='col-md-4 w-50 p-5'>
						<Link to='/teacher/dashboard'>
							<span className='fas fa-arrow-left'>Go Back</span>
						</Link>
						<div className='px-2'>
							<br />
							<div className='modal-content'>
								<form onSubmit={handleAssignmentSubmit}>
									<div className='modal-header bg-warning text-white'>
										<h5 className='modal-title'>
											Update Assignment
										</h5>
									</div>
									<div className='modal-body my-2'>
										<Fragment>
											<label className='btn btn-dark mr-4'>
												Choose file
												<input
													type='file'
													name='assignmentFile'
													hidden
													onChange={handleAssignemntFileUpload}
												/>
											</label>

											<div className='form-group'>
												<label className='text-secondary'>
													Assignment Name
												</label>
												<input
													type='text'
													className='form-control'
													name='assignmentName'
													value={assignmentName}
													onChange={e =>
														setAssignmentName(
															e.target.value
														)
													}
												/>
											</div>
											<div className='form-group'>
												<label className='text-secondary'>
													Description
												</label>
												<textarea
													className='form-control'
													rows='5'
													name='assignmentDescription'
													value={assignmentDescription}
													onChange={e =>
														setAssignmentDescription(
															e.target.value
														)
													}
												></textarea>
											</div>
				
											<div className="form-group py-2">
                                                <label for="exampleFormControlSelect1"></label>
                                                <select className="form-control" name='assignmentGroup'>
                                                    <option value=''>Choose group..</option>
                                                    {groups && groups.map( g => (
                                                    <option key={g._id} value={g._id}>{g.group}</option>
                                                    ))}
                                                </select>
                                            </div>
										</Fragment>
									</div>
									<div className='modal-footer'>
										<button
											type='submit'
											className='btn btn-warning text-white'
										>
											Submit
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
    
  )
}

export default TeacherAssignmentEdit;
