import React, {useState, useEffect} from 'react';
import {getCustomers, getCustomerById,updateCustomer, addCustomer } from '../service/CustomerAPI';
import Menu from './Menu';
import {useHistory, useRouteMatch} from "react-router-dom";
import { emitCustomEvent } from 'react-custom-events';
import { Button, Grid, Paper, Avatar, TextField, FormControl, InputLabel } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

export function UpdateCustomerList() {
    var history = useHistory();
    var match = useRouteMatch();

 const [customers, setCustomers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [buttomLabel, setLable] = useState("Add");
    const [id, setId] = useState(0);
    var fetchCustomer = async (id) =>{
        var customer = await getCustomerById(id);
            setId(customer.id);
            setName(customer.name);
            setEmail(customer.email);
            setPhone(customer.phone);
            setAddress(customer.address);
            setLable("Update");
      }
      useEffect( ()=>{
        if(match.params.id != undefined){
            fetchCustomer(match.params.id );
        }else{
            console.log("do Add.....");
            setId("0");
        }
    },[]); 

  var handleChange = (e) => {
    eval(e.target.name)(e.target.value);
  }

  var resetForm = () =>  {
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setId(0);
      setLable("Add");
  }

  var handleSubmit = async (e) =>  {
    e.preventDefault();
    if (!name.length) {
      return;
    }
    const newItem = {
      name,email,phone,address
    };
    if(id == 0){
    //   newItem.id = Date.now();
    //   await addCustomer(newItem);
    const newId = await getCustomers();
            var count = newId.length + 1;
            for (var  i = 0; i < newId.length; i++) {
                if(newId[i].id == count) count++;
            }
            newItem.id = count;
            await addCustomer(newItem);
    //   emitCustomEvent('addCustomer', newItem);
    }else{
        newItem.id = id;
        await updateCustomer(newItem);
    }
    resetForm();
    history.push("/customer");
  }
  const loginStyle = { padding: 20, height: '75vh', width: 280, margin: "20px auto" }
  const avatarStyle = { backgroundColor: '#1BBD7E' }
  const btnStyle = { marginTop: '30px' }
    return (
        <div>
            <Menu/>
            <Grid>
                <Paper elevation={10} style={loginStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><AddCircleOutlineOutlinedIcon /></Avatar>
                        <h2>Customer Data</h2>
                    </Grid>
                    <FormControl fullWidth onSubmit={handleSubmit}>
                        <TextField label="Name" placeholder="Enter Name" name="setName" onChange={handleChange} value={name} fullWidth required />
                        <TextField label="Email" placeholder="Enter Email" name="setEmail" onChange={handleChange} value={email} fullWidth required />
                        <TextField label="Phone Number" placeholder="Enter Phone Number" name="setPhone" onChange={handleChange} value={phone} fullWidth required />
                        <TextField label="Address" placeholder="Enter Address" name="setAddress" onChange={handleChange} value={address} fullWidth required />
                        <Button onClick={handleSubmit} variant="contained" style={btnStyle} color="primary" fullWidth>{buttomLabel}</Button>
                        <Button onClick={resetForm} variant="contained" style={btnStyle} color="secondary" fullWidth>Reset</Button>
                    </FormControl>
                </Paper>
            </Grid>        
      </div>
    );
}
