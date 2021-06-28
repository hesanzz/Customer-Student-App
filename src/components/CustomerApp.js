import React, {useState, useEffect} from 'react';
import {getCustomers,deleteCustomer } from '../service/CustomerAPI';
import Menu from './Menu';
import {useHistory} from "react-router-dom";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { green } from '@material-ui/core/colors';
import './styles.css';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
      marginTop: 20,
      borderTop: '1px grey solid'
    },
    title: {
        fontWeight: 800
    }
});

export function CustomerApp() {

    var history = useHistory();

  var fetchCustomers = async() => {
    var listCustomers = await getCustomers();
    setCustomers(listCustomers);
  }

  useEffect(() => {
    fetchCustomers();
  }, [])

 const [customers, setCustomers] = useState([]);
 const btnStyle = { marginTop: '30px' }

  var removeCustomer = async (customerId) => {
    await deleteCustomer({id:customerId});
    fetchCustomers();
  }
  
  var editCustomer = async (customerId) => {
      history.push("/customer/edit/"+customerId);
  }
  var goAdd = () => {
    history.push("/customer/add");
}
    return (
      <div>
        <Menu/>
        <h3 className="title">CUSTOMERS LIST</h3>
         <TodoList customers={customers} 
        removeCustomer={removeCustomer}
        editCustomer={editCustomer}/>
        <Button style={btnStyle} className="button-add" onClick={goAdd} variant="contained"  color="primary">Add Customer</Button>
      </div>
    );
}

function TodoList({customers,removeCustomer,editCustomer}) {
    const classes = useStyles();
    return (
        <div>
            <TableContainer component={Paper}>
            <Table style={{width:"100%"}} className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
            <TableCell className={classes.title}>#</TableCell>
            <TableCell className={classes.title}>Name</TableCell>
            <TableCell className={classes.title}>Email</TableCell>
            <TableCell className={classes.title}>Phone</TableCell>
            <TableCell className={classes.title}>Address</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {customers.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell id={item.id}>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>{item.address}</TableCell>
                            <TableCell> <EditIcon style={{ color: green[500] }} fontSize="small" onClick={()=> editCustomer(item.id)} /> </TableCell>
                            <TableCell> <DeleteOutlineIcon fontSize="small" onClick={()=> removeCustomer(item.id)} /> </TableCell>
                        </TableRow>
                        ))}
            </TableBody>
            </Table>
            </TableContainer>
        </div>
    );
}