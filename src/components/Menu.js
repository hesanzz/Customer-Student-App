import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {useContext} from 'react';
import UserContext from './UserContext';

function  Menu () {
    const userContext = useContext(UserContext);
     return (
        <div>
            <Link to={'/home'}>Home</Link>&nbsp;|&nbsp;
            <Link to={'/Student'}>Students</Link>&nbsp;|&nbsp;
            <Link to={'/customer'}>Customer</Link>&nbsp;|&nbsp;
            <Link to={'/about'}>About</Link>&nbsp;|&nbsp;
            {/* <Link to={'/login'}>Logout</Link> */}
            <Link onClick={()=>{
            console.log(">> logout");
            userContext.doLogin(false);
          }} to={'/login'}>Logout</Link>
            <hr />
        </div>
     );
 }
 export default Menu;

// import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Breadcrumbs from '@material-ui/core/Breadcrumbs';
// import Link from '@material-ui/core/Link';
// import {useContext} from 'react';
// import UserContext from './UserContext';

// function handleClick(event) {
//   event.preventDefault();
//   console.info('You clicked a breadcrumb.');
// }

// export default function Menu() {
//     const userContext = useContext(UserContext);
//   return (
//     <Breadcrumbs aria-label="breadcrumb">
//       <Link color="inherit" href="/home" onClick={handleClick}>
//       Home
//       </Link>
//       <Link color="inherit" href="/Student" onClick={handleClick}>
//       Students
//       </Link>
//       <Link color="inherit" href="/customer" onClick={handleClick}>
//       Customer
//       </Link>
//       <Link color="inherit" href="/about" onClick={handleClick}>
//       About
//       </Link>
//       <Link
//         color="textPrimary"
//         href="/login"
//         onClick={()=>{
//             console.log(">> logout");
//             userContext.doLogin(false);
//           }}
//       >
//         Logout
//       </Link>
//     </Breadcrumbs>
//   );
// }