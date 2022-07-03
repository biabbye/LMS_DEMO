import React from "react"

const TeacherButtonsDashboard = () => (
    <div className='bg-light my-3'>
        <div className='container justify-content-md-center'>
            <div className='row pb-3 py-2'>
                <div className='col-md-4 my-1'>
                    <button className='btn btn-outline-info btn-block py-2' data-bs-toggle='modal' data-bs-target='#addGroupModal'>
                      <i class="fa fa-plus" aria-hidden="true">Add Group Number</i>
                    </button>
                </div>
                <div className='col-md-4 my-1'>
                    <button className='btn btn-outline-warning btn-block py-3' data-bs-toggle='modal' data-bs-target='#addAssignmentModal'>
                      <i class="fa fa-plus" aria-hidden="true">Add Assignment</i>
                    </button>
                </div>
                <div className='col-md-4 my-1'>
                    <button className='btn btn-outline-success btn-block py-2'>
                    <i class="fa fa-eye" aria-hidden="true">View Assignments</i>
                    </button>
                </div>
  
            </div>
        </div>
  
    </div>
  )

  export default TeacherButtonsDashboard;