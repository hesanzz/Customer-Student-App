import React, { Component, useRef, useContext } from 'react';
import { useHistory } from "react-router-dom";
import {apiLogin} from "../service/CustomerAPI";
import UserContext from "./UserContext";
import { Button, Grid, Paper, Avatar, TextField, FormControl, InputLabel } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

function Login(props) {
    const userContext = useContext(UserContext);
    var history = useHistory();
    var usernameInput = useRef(); //document.getById
    var passwordInput = useRef();
    var doLogin = () =>{
        // Uncontrolled
        console.log("usernameInput:"+usernameInput.current.value);
        console.log("passwordInput:"+passwordInput.current.value);

         var email = usernameInput.current.value;
         var password = usernameInput.current.value;

         return fetch(apiLogin, {
            method: 'post',
               headers: {
               'Content-Type': 'application/json;charset=utf-8'
                },
                body:JSON.stringify({email,password})
            })
            .then(response => response.json())
            .then(response => {
               console.log(JSON.stringify(response));
               if(response.result == "success"){
                  userContext.doLogin(true);
                  history.push("/home");
               }else{
                  alert('username or password is incorrect.')
               }

           }).catch(function(error) {
             console.log(error);
         });         

      //   if(usernameInput.current.value == passwordInput.current.value 
      //         && usernameInput.current.value!= ""){
      //       userContext.doLogin(true);
      //      history.push("/home");
      //   }else{
      //      alert('username or password is incorrect.')
      //   }
          
    }
    const loginStyle = { padding: 20, height: '75vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1BBD7E' }
    const btnStyle = { marginTop: '30px' }
    return (
        // <div>
        //     <h2>Login</h2>
        //     <form>
        //         <input  ref={usernameInput} placeholder="username" /><br/><br/>
        //         <input  ref={passwordInput} type="password" placeholder="password" /><br/><br/>
        //         <Button  onClick={doLogin} variant="contained"  color="primary">Submit</Button>
        //         <Button  onClick={()=>{history.push('/home')}} variant="contained"  color="secondary">Home</Button>
        //     </form>
        // </div>
        <div>
        <Grid>
            <Paper elevation={10} style={loginStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><AddCircleOutlineOutlinedIcon /></Avatar>
                    <h2>LOG IN</h2>
                </Grid>
                <FormControl fullWidth>
                    <TextField inputRef={usernameInput} label="Name" placeholder="Enter Username"  fullWidth required />
                    <TextField inputRef={passwordInput} label="Password" placeholder="Enter Password" fullWidth required />
                    <Button onClick={doLogin} variant="contained" style={btnStyle} color="primary" fullWidth>Submit</Button>
                    <Button onClick={()=>{history.push('/home')}} variant="contained" style={btnStyle} color="secondary" fullWidth>Home</Button>
                </FormControl>
            </Paper>
        </Grid>        
        </div>
    );
}
export default Login;