import React from 'react'
import { AssignmentsTable } from '../AssignmentsTable';

const TeacherBody = () => {
  return (
    <section>
      {/* <div className='containerSidebar'>
        <Sidebar/>
      </div>
      <div className='containerTable'>
        <AssignmentsTable/>
      </div> */}
      
      <AssignmentsTable/>
       
    </section>
   
  )
}

export default TeacherBody