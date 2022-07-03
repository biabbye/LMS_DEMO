import React,{useEffect} from 'react'
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
 } from '@material-ui/core';
 import {isAuthenticated} from '../../../helpers/auth';
import { clearMessages } from '../../../redux/actions/messageActions';
import {deleteAssignment} from '../../../redux/actions/assignmentActions';


 const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: '1000px',
    alignItems:'center',
  },
  tableContainer: {
      borderRadius: 10,
      margin: '25px 10px',
      maxWidth:'1200px',

  },
  tableHeaderCell: {
      fontWeight: 'bold',
      backgroundColor: theme.palette.info.dark,
      color: theme.palette.getContrastText(theme.palette.primary.light)
  },
  avatar: {
        backgroundColor: theme.palette.info.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
  },
  name: {
      fontWeight: 'bold',
  },
  status: {
      fontWeight: 'bold',
      fontSize: '0.75rem',
      color: 'white',
      backgroundColor: 'grey',
      borderRadius: 8,
      padding: '3px 10px',
      display: 'inline-block'
  }
}));

export const AssignmentsTable = () => {


  const classes = useStyles();
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const dispatch = useDispatch();

  const {assignments} = useSelector(state => state.assignments);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleMessages = (e) =>{
    dispatch(clearMessages());
    }
  

  return (

    <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
         <TableContainer component={Paper} className={classes.tableContainer} >
        <Table className={classes.table} aria-label = "simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Assignment Name</TableCell>
              <TableCell className={classes.tableHeaderCell}>Description</TableCell>
              <TableCell className={classes.tableHeaderCell}>Status</TableCell>
              <TableCell className={classes.tableHeaderCell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments && assignments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((assignment)=>(
              <TableRow key={assignment._id} assignment={assignment}>
                <TableCell>
                  <Grid container>
                      {isAuthenticated() && isAuthenticated().role === 0 && (
                        <Grid item lg={2} className='ms-3 px-2'>
                          <Avatar alt={assignment.assignmentStatus} src='.' className={classes.avatar}/>
                        </Grid>
                    )}
                    <Grid item lg={10}>
                        <Typography className={classes.name}>{assignment.assignmentName}</Typography>
                        <Typography color="textSecondary" variant="body2">{assignment.createdAt.slice(0,10)}</Typography>
                    </Grid>
    
                    
                  </Grid>
                </TableCell>
                <TableCell>
                  <Grid container>
                    <Grid item lg={10}>
                        <Typography color="primary" variant="subtitle2" className={classes.name}>{assignment.assignmentDescription}</Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Typography className={classes.status} style={ {
                    backgroundColor: ((assignment.assignmentStatus === 'Active' && 'blue')) || ((assignment.assignmentStatus === 'Submitted' && 'green')) || ((assignment.assignmentStatus === 'Unsubmitted' && 'red'))
                  }}>{assignment.assignmentStatus}</Typography>
                </TableCell>
                <TableCell>
                {isAuthenticated() && isAuthenticated().role === 0 && (
                  <Typography className={classes.name}>
                   
                      <Link type="button" className="btn btn-outline-success ms-2 px-4 rounded-pill" to={`/${assignment._id}`} onClick={handleMessages}>Start Coding</Link>
                
                  </Typography>
                )}
                {isAuthenticated() && isAuthenticated().role === 1 && (
                  <Typography className={classes.name}>
                   
                      <Link  to={`/teacher/dashboard/edit/${assignment._id}`} type="button" className="btn btn-outline-primary ms-2 px-4 rounded-pill">Edit</Link>
                      <button type="button" className="btn btn-outline-danger ms-2 px-4 rounded-pill" onClick={() => {dispatch(deleteAssignment(assignment._id))}}>Delete</button>
                
                  </Typography>
                )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
          <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={-1}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
     
  )
}
