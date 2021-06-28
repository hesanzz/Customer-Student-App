import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import {getStudents, deleteStudent} from '../service/StudentRestAPI';
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
var students =[
    {id:1,name:"Lamia",cName:"8",pName:'Nayak',sName:'MCC', subject: 'Hindi'},
    {id:2,name:"Lilly",cName:"6",pName:'Laden',sName:'MMR', subject: 'History'},
    {id:3,name:"Rose",cName:"9",pName:'Mary',sName:'IJHS', subject: 'Maths'}
];

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

export function StudentApp() {

    var history = useHistory();

    var fetchStudentLists = async() => {
        var studentLists = await getStudents();
        setStudents(studentLists);
    }

    useEffect(() => {
        fetchStudentLists();
    }, [])

    const [students, setStudents] = useState([]);
    const btnStyle = { marginTop: '30px' }

    var removeStudent = async (id) => {
    await deleteStudent({id});
    fetchStudentLists();
    }
    var editStudent = (id) => {
        history.push('/student/edit/'+id);
        console.log("edited id", id);
    }
    var gotoAdd = () => {
        history.push('/student/add');
    }
    return (
        <div>
            <Menu/>
            <h2 className="title">STUDENTS LIST</h2>
            <TodoList students = {students}
            removeStudent = {removeStudent}
            editStudent = {editStudent} />
            <Button style={btnStyle} className="button-add" onClick={gotoAdd} variant="contained"  color="primary">Add student</Button>
        </div>
    );
}

function TodoList({students,removeStudent,editStudent}) {
    const classes = useStyles();
    return (
        <div>
        <TableContainer component={Paper}>
        <Table style={{width:"100%"}} className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
            <TableRow>
            <TableCell className={classes.title}>Id</TableCell>
            <TableCell className={classes.title}>Name</TableCell>
            <TableCell className={classes.title}>Class</TableCell>
            <TableCell className={classes.title}>Parent Name</TableCell>
            <TableCell className={classes.title}>Address</TableCell>
            <TableCell className={classes.title}>Subject</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {students.map(item => (
                    <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell id={item.id}>{item.name}</TableCell>
                        <TableCell>{item.cName}</TableCell>
                        <TableCell>{item.pName}</TableCell>
                        <TableCell>{item.sName}</TableCell>
                        <TableCell>{item.subject.join(', ')}</TableCell>
                        <TableCell> <EditIcon style={{ color: green[500] }} fontSize="small" onClick={()=> editStudent(item.id)} /> </TableCell>
                        <TableCell> <DeleteOutlineIcon fontSize="small" onClick={()=> removeStudent(item.id)} /> </TableCell>
                    </TableRow>
                    ))}
        </TableBody>
        </Table>
        </TableContainer>
        </div>
    );
}