import React from "react"
import { Fragment, useState } from "react"
import isEmpty from 'validator/lib/isEmpty';
import { showErrorMsg, showSuccessMsg } from '../../../../helpers/validationMessage';
import { showLoading} from '../../../../helpers/loading';
import { useSelector, useDispatch } from "react-redux";
import { clearMessages } from "../../../../redux/actions/messageActions";
import { createGroup } from "../../../../redux/actions/groupActions";

const TeacherGroupModal = () => {

    //redux global state properties

    const {successMsg,errorMsg} = useSelector(state => state.messages)
    const {loading} = useSelector(state => state.loading)

    const dispatch = useDispatch();

    const [group, setGroup] = useState('');
    const [clientSideErrorMsg , setClientSideErrorMsg] = useState('');
    const handleMessages = (e) =>{
       dispatchEvent(clearMessages)
       setClientSideErrorMsg('');
      }
    
      const handleGroupChange = (e) =>{
        dispatchEvent(clearMessages)
        setGroup(e.target.value);
     };
    
    
     const handleGroupSubmit = (e) =>{
       e.preventDefault();
      
       if(isEmpty(group)){
          setClientSideErrorMsg('Please enter a group number.')
       }else{
        const data = {group};
    
        dispatch(createGroup(data));
        setGroup('');
       }
    
       
     };


     return (
        <div id='addGroupModal' className='modal' onClick={handleMessages}>
            <div className='modal-dialog modal-dialog-centered modal-lg'>
                <div className='modal-content'>
                    <form onSubmit={handleGroupSubmit}>
                            <div className='modal-header bg-info text-white'>
                                <h5 className='modal-title'>Add Group Number</h5>
                            </div>
                            <div className='modal-body my-2'>
                                {clientSideErrorMsg && showErrorMsg(clientSideErrorMsg)}
                                {errorMsg && showErrorMsg(errorMsg)}
                                {successMsg && showSuccessMsg(successMsg)}
                                {
                                    loading ? (
                                    <div className='text-center'>
                                        {showLoading()}
                                    </div>
                                    ) : (
                                    <Fragment>
                                        <label className='text-secondary'>Group Number</label>
                                        <input type='text' className='form-control' name='group' value={group} onChange={handleGroupChange}/>
                                    </Fragment>
                                    ) 
                                }
                                
                                
                            </div>
                            <div className='modal-footer'>
                                <button className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                                <button type='submit' className='btn btn-info'>Submit</button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
     )
    
}

  export default TeacherGroupModal;