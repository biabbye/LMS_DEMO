import React,{useEffect} from 'react'
import StudentBody from './StudentBody';
//redux
import { useDispatch } from 'react-redux';
import {getGroups} from '../../../../redux/actions/groupActions';
import { getAssignments } from '../../../../redux/actions/assignmentActions';

const StudentDashboard = (props) => {
  const dispatch = useDispatch();
  useEffect( () => {
    dispatch(getGroups());
  },[dispatch])
  useEffect( () => {
    dispatch(getAssignments());
  },[dispatch])
    return (
      <section>

        <StudentBody />
      </section>
    )
  }
  
  export default StudentDashboard