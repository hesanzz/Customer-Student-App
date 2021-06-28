import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Protected from './components/Protected';
import UserCtx from './components/UserContext';
import { useCustomEventListener } from 'react-custom-events';
import Login from './components/Login';
import Home from './components/Home';
import About from './components/About';
// import {StudentApp} from './components/StudentApp';
import {StudentApp} from './components/StudentAppRestAPI';
import {UpdateStudentList} from './components/UpdateStudentList';
import  {CustomerApp} from './components/CustomerApp';
import {UpdateCustomerList} from './components/UpdateCustomerList';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
     //const theme = useContext(ThemeContext);
     useCustomEventListener('addCustomer', data => {
      console.log( JSON.stringify(data) ); 
    });
  return (
    <Router>
    <UserCtx.Provider
        value={{
          isLoggedIn,
          doLogin: code =>{
             if(code) {
               setLoggedIn(true);
               localStorage.setItem('isLoggedIn', "true");
             }else {
                localStorage.removeItem('isLoggedIn');
                setLoggedIn(false);
             }
            }   
        }}
      >
      <div>
        <Switch>
            <Route exact path='/' component={Login} />
            {/* <Route exact path='/home' component={Home} /> */}
            {/* <Route exact path='/Student' component={StudentApp} /> */}
            <Route exact path='/login' component={Login} />
            <Route exact path='/student/add' component={UpdateStudentList} />
          <Route exact path='/student/edit/:id' component={UpdateStudentList} />
          <Route exact path='/customer/add' component={UpdateCustomerList} />
          <Route exact path='/customer/edit/:id' component={UpdateCustomerList} />
          <Protected isLoggedIn={isLoggedIn} path="/customer">
                <CustomerApp />
          </Protected>
          <Protected isLoggedIn={isLoggedIn} path="/Student">
                <StudentApp />
          </Protected>
          <Protected isLoggedIn={isLoggedIn} path="/home">
                <Home />
          </Protected>
          <Route exact path='/about' component={About} />
        </Switch>
      </div>
     </UserCtx.Provider> 
    </Router>
  );
}

export default App;
