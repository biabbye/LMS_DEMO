import React from 'react';
import './App.css';
import Navbar from './components/pages/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Services from './components/pages/Services';
import Contact from './components/pages/Contact';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import TeacherRoute from './components/TeacherRoute';
import StudentRoute from './components/StudentRoute';
import StudentDashboard from '../../client/src/components/pages/Dashboard/StudentDashboard/StudentDashboard';
import TeacherDashboard from '../../client/src/components/pages/Dashboard/TeacherDashboard/TeacherDashboard';
import TeacherAssignmentEdit from './components/pages/Dashboard/TeacherDashboard/TeacherAssignmentEdit';
import Compiler from './components/compiler/Compiler';



const App = () =>{

  return (
    <BrowserRouter>
        <Navbar/>
        <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/services" component={Services} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register}/>
        <StudentRoute exact path='/student/dashboard' component={StudentDashboard} />
        <StudentRoute exact path='/:assignmentId' component={Compiler} />
        <TeacherRoute exact path='/teacher/dashboard' component={TeacherDashboard} />
        <TeacherRoute exact path='/teacher/dashboard/edit/:assignmentId' component={TeacherAssignmentEdit} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;