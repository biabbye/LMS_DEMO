import React,{useEffect} from 'react'
import TeacherButtonsDashboard from './TeacherButtonsDashboard';
import TeacherGroupModal from './TeacherGroupModal';
import TeacherAssignmentModal from './TeacherAssignmentModal';
import TeacherBody from './TeacherBody';
import Sidebar from '../Sidebar/Sidebar';
//redux
import { useDispatch } from 'react-redux';
import {getGroups} from '../../../../redux/actions/groupActions';
import { getAssignments } from '../../../../redux/actions/assignmentActions';
import {Router} from 'react-router-dom';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const dispatch = useDispatch();
  useEffect( () => {
    dispatch(getGroups());
  },[dispatch])
  useEffect( () => {
    dispatch(getAssignments());
  },[dispatch])
  return (
    <section>
        <TeacherGroupModal />
        <TeacherAssignmentModal />
        <div className='container'>
            <Sidebar/>
            <TeacherBody />
        </div>
        
    </section>
)
  }
  
  export default TeacherDashboard