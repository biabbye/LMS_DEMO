import React,{Fragment,useState} from "react"
import isEmpty from 'validator/lib/isEmpty';
import { showErrorMsg, showSuccessMsg } from '../../../../helpers/validationMessage';
import { showLoading} from '../../../../helpers/loading';
import { useSelector, useDispatch } from 'react-redux';
import { clearMessages } from '../../../../redux/actions/messageActions';
import { createAssignment } from '../../../../redux/actions/assignmentActions';

const TeacherAssignmentModal = () => {

    const { loading } = useSelector(state => state.loading);
    const { successMsg, errorMsg } = useSelector(state => state.messages);
    const { groups } = useSelector(state => state.groups);

    const dispatch = useDispatch();

    const [clientSideError, setClientSideError] = useState('');
    const [assignmentData, setAssignmentData] = useState({
        assignmentFile : null,
        assignmentName: '',
        assignmentDescription: '',
        assignmentGroup: '',
    });

    const {assignmentFile, assignmentName, assignmentDescription, assignmentGroup} = assignmentData;

    const handleMessages = (e) =>{
      dispatch(clearMessages());
      setClientSideError('');
      }


    const handleAssignmentChange = (e) => {
        setAssignmentData({
        ...assignmentData,
        [e.target.name]: e.target.value
        });
    };

    const handleAssignmentFile = evt => {
      setAssignmentData({
        ...assignmentData,
        [evt.target.name]: evt.target.files[0],
      });
    };

    const handleAssignmentSubmit = (e) => {
        e.preventDefault();
        
        if(assignmentFile === null) {
          setClientSideError('Please upload test cases.');
        }else if(isEmpty(assignmentName) || isEmpty(assignmentDescription)){
          setClientSideError('Please enter all fields');
        }else if(isEmpty(assignmentGroup)){
          setClientSideError('Please choose a group to assign.');
        }else{
          const formData = {assignmentData};
          dispatch(createAssignment(formData));
          setAssignmentData({
            assignmentFile: null,
            assignmentName: '',
            assignmentDescription: '',
            assignmentGroup: '',
          });

        
        // createAssignment(formData).then((response) =>{
        
        //     setAssignmentData({
        //     assignmentName: '',
        //     assignmentDescription: '',
        //     assignmentGroup: ''
        //     })
        //     setSuccessMsg(response.data.successMessage);
        // }).catch((err) =>{
        //     console.log(err);
        //     setErrorMsg(err.data.errorMessage);
        // });

        }
    };


    return (
        <div id='addAssignmentModal' className='modal' onClick={handleMessages}>
        <div className='modal-dialog modal-dialog-centered modal-lg'>
            <div className='modal-content'>
                <form onSubmit={handleAssignmentSubmit}>
                        <div className='modal-header bg-warning text-white'>
                            <h5 className='modal-title'>Add Assignment</h5>
                        </div>
                        <div className='modal-body my-2'>
                              {clientSideError && showErrorMsg(clientSideError)}
                              {errorMsg && showErrorMsg(errorMsg)}
                              {successMsg && showSuccessMsg(successMsg)}
                              {
                                loading ? (
                                  <div className='text-center'>
                                    {showLoading()}
                                  </div>
                                ) : (
                                  <Fragment>
                                    <div className='form-group'>
                                      <label className='text-secondary'>
                                        Name
                                      </label>
                                      <input
                                        type='text'
                                        className='form-control'
                                        name='assignmentName'
                                        value={assignmentName}
                                        onChange={handleAssignmentChange}
                                        
                                      />
                                    </div>
  
                                    <div className='form-group'>
                                      <label className='text-secondary'>
                                        Description
                                      </label>
                                      <textarea
                                        className='form-control'
                                        rows='3'
                                        name='assignmentDescription'
                                        value={assignmentDescription}
                                        onChange={handleAssignmentChange}
                                      ></textarea>
                                    </div>
  
                                    {/* <div className='form-group'>
                                      <label className='text-secondary'>
                                        Status
                                      </label>
                                      <input
                                        type='text'
                                        className='form-control'
                                        name='assignmentStatus'
                                        value={assignmentStatus}
                                        onChange={handleAssignmentChange}
                                        readOnly
                                      />
                                    </div> */}
  
                                    <div className="form-group py-2">
                                      <label for="exampleFormControlSelect1"></label>
                                      <select className="form-control" name='assignmentGroup' onChange={handleAssignmentChange}>
                                        <option value=''>Choose group..</option>
                                        {groups && groups.map( g => (
                                          <option key={g._id} value={g._id}>{g.group}</option>
                                        ))}
                                      </select>
                                    </div>

                                    <div className='custom-file mb-2'>
                                      <input
                                        type='file'
                                        className='custom-file-input'
                                        name='assignmentFile'
                                        onChange={handleAssignmentFile}
                                      />
                                      <label className='custom-file-label'>
                                        Choose File
                                      </label>
                                    </div>
                                  </Fragment>
                                ) 
                              }
                              
                            
                        </div>
                        <div className='modal-footer'>
                            <button className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                            <button type='submit' className='btn btn-warning text-white'>Submit</button>
                        </div>
                </form>
            </div>
        </div>
      </div>
    )
    
}

  export default TeacherAssignmentModal;