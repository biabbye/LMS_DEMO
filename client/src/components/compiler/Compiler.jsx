import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import CodeMirror from '@uiw/react-codemirror';
//import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import {getAssignment} from '../../../../client/src/redux/actions/assignmentActions';
import './Compiler.css';
import { showLoading} from '../../helpers/loading';
import { showErrorMsg, showSuccessMsg } from '../../helpers/validationMessage';
import { START_LOADING, STOP_LOADING } from "../../redux/constants/loadingConstants";
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE } from "../../redux/constants/messageConstants";
import { clearMessages } from '../../redux/actions/messageActions';

const Compiler = ({match}) => {

    const assignmentId = match.params.assignmentId;

    const dispatch = useDispatch();
    const {assignment} = useSelector(state => state.assignments);
    const { loading } = useSelector(state => state.loading);
    const { successMsg, errorMsg } = useSelector(state => state.messages);


    const [assignmentName, setAssignmentName] = useState('');
    const [assignmentDescription, setAssignmentDescription] = useState('');

    const [code,setCode] = useState('def solution(arr):');
    const [language,setLanguage] = useState('py');
    const [output, setOutput] = useState('');
    const [testCaseResults, setTestCaseResults] = useState([]);


    const handleMessages = (e) =>{
        dispatch(clearMessages());
        }


    useEffect(() => {
        if(!assignment){
            dispatch(getAssignment(assignmentId));
        }else{
            setAssignmentName(assignment.assignmentName);
            setAssignmentDescription(assignment.assignmentDescription);
        }
    },[dispatch,assignmentId,assignment]);

    
    const handleSubmit = async () =>{
        
        const payload =  {
            language: language,
            code
        };
        try {
            dispatch({type:START_LOADING})
            const {data} = await axios.post(`http://localhost:5000/assignment/run/${assignmentId}`, payload)
            dispatch({type:STOP_LOADING})
            dispatch({type:SHOW_SUCCESS_MESSAGE,payload:data.successMessage})
            setOutput(data.output);


            
        } catch (error) {
            
            dispatch({type:STOP_LOADING});
            dispatch({type:SHOW_ERROR_MESSAGE,payload:error.response.data.errorMessage})
        }
        
    }

    const handleSubmitPython =async  () => {
        const payload =  {
            language: language,
            code
        };

        dispatch({type:START_LOADING})
        const {data} = await axios.post(`http://localhost:5000/assignment/run/${assignmentId}`, payload)
        dispatch({type:STOP_LOADING})
        dispatch({type:SHOW_SUCCESS_MESSAGE,payload:data.successMessage})
        setOutput(data.output);
      
    }

  
//     axios.get(`/api/assignment/run/${assignmentId}`).then((res) => {
//             setAssignmentName(res.data.setAssignmentName);
//         });
  
//    console.log(assignmentName);
        
   
  return (

    <div className="container">

    <div className="card bg-light mb-5 w-25 p-3">
        <div className="card-header">{assignmentName}</div>
        <div className="card-body d-flex flex-column">
            <h5 className="card-title">{assignmentName}</h5>
            <p className="card-text">{assignmentDescription}</p>
            <button type="button" className='btn btn-outline-success ms-3 px-4 mt-auto'>Submit</button>
        </div>
    </div>
 

    <div className="float-container">
        
        <div className='upBar'>
            <button type="button" className=' btn btn-outline-success ms-4 px-4' onClick={() => { handleSubmitPython();handleMessages()}}>Run</button>
            <h4 className='output'>Output</h4>
            
        </div>

        <div>
            {errorMsg && showErrorMsg(errorMsg)}
            {successMsg && showSuccessMsg(successMsg)}
            {
                loading && showLoading()
            }
        </div>
        <div>
            Language:
            <select name='language' value={language} onChange={(e) => { setLanguage(e.target.value)}}>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
            </select>
        </div>

        {/* <div>
            {testCaseResults.map((res, i) => {
              return (
                <div key={i}>
                  <div>{res === 'True' ? '✅ passed' : '❌ failed'}</div>
                </div>
              );
            })}
        </div> */}
       

         {/* <button type="button" className='btn btn-outline-success ms-3 px-4' onClick={handleSubmit}>Submit</button> */}
         <div className="compiler">
         <CodeMirror
        value={code}
        options={{
            mode: 'python',
            lineNumbers: true,
            readOnly: false,
        }}
        height="500px"
        width="600px"
        theme={oneDark}
        extensions={python()}
        onChange={(value, viewUpdate) => {
            setCode(value);
        }}
        />
         </div>
         <div className='compiler'>
             <CodeMirror value={output} options={{
                    lineNumbers: false,
                    readOnly: true,
                    className:"readOnly"
                }} 
                height="500px"
                width="400px"
                theme={oneDark}
                />
         </div>
         

        {/* <textarea rows="20" cols="75" value={code} onChange={ (e) => {setCode(e.target.value);}} ></textarea> */}
        
    </div>
    </div>
    
  )
}

export default Compiler