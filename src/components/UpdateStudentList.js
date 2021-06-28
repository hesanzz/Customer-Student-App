import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import {addStudent, getStudentById, updateStudent, getStudents} from '../service/StudentRestAPI';
import {useHistory, useRouteMatch} from "react-router-dom";
import { emitCustomEvent } from 'react-custom-events';
import MultiSelect from "react-multi-select-component";
import { Button, Grid, Paper, Avatar, TextField, FormControl, InputLabel } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

export function UpdateStudentList() {

    var history = useHistory();
    var match = useRouteMatch();

    var studentSubjects = [];
    const options = [
      {
        label: "Maths",
        value: "Maths"
      },
      {
        label: "English",
        value: "English"
      },
      {
        label: "Science",
        value: "Science"
      },
      {
        label: "Arts",
        value: "Arts"
      },
      {
        label: "Painting",
        value: "Painting"
      }
    ]
    const [students, setStudents] = useState([]);
    const [name, setName] = useState("");
    const [cName, setCName] = useState("");
    const [pName, setPName] = useState("");
    const [sName, setSName] = useState("");
    const [subject, setSub] = useState("");
    const [buttomLabel, setLable] = useState("Add");
    const [id, setId] = useState(0);
    const [selected, setSelected] = useState(studentSubjects);

    var onChangeSubject = (newValue) => {
      console.log(JSON.stringify(newValue));
      setSelected(newValue);
    };

    var fetchStudentLists = async (id) =>{
        var student = await getStudentById(id);
        setId(student.id);
        setName(student.name);
        setCName(student.cName);
        setPName(student.pName);
        setSName(student.sName);
        // setSub(student.subject);
        student.subject.map((item =>{
            studentSubjects.push({"label":item,"value":item})
        }))
        console.log("studentSubjects"+JSON.stringify(studentSubjects));
        setSub(studentSubjects);
        setLable("Update");
        
    }

    useEffect( ()=>{
        if(match.params.id != undefined){
            fetchStudentLists(match.params.id );
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
        setCName("");
        setPName("");
        setSName("");
        setSub("");
        setId(0);
        setLable("Add");
    }
    
    var handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.length) {
            return;
        }
        const selectSub = []
        selected.map(item => selectSub.push(item.value)); 
        const newStudent = {
            name,cName, pName, sName, subject
        }
        if(id == 0) {
            const newId = await getStudents();
            var count = newId.length + 1;
            for (var  i = 0; i < newId.length; i++) {
                if(newId[i].id == count) count++;
            }
            newStudent.id = count;

            newStudent.subject = selectSub;
            await addStudent(newStudent);
            // emitCustomEvent('addStudent', newStudent);
        } else {
            newStudent.id = id;
            newStudent.subject = selectSub;
            await updateStudent(newStudent);
        }
        resetForm();
        history.push('/student');
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
                        <h2>Student Data</h2>
                    </Grid>
                    <FormControl fullWidth onSubmit={handleSubmit}>
                        <TextField label="Name" placeholder="Enter Name" name="setName" onChange={handleChange} value={name} fullWidth required />
                        <TextField label="className" placeholder="Enter className" name="setCName" onChange={handleChange} value={cName} fullWidth required />
                        <TextField label="parentName" placeholder="Enter parentName" name="setPName" onChange={handleChange} value={pName} fullWidth required />
                        <TextField label="schoolName" placeholder="Enter schoolName" name="setSName" onChange={handleChange} value={sName} fullWidth required />
                        <TextField label="Subjects" disabled />
                        <MultiSelect
                        options={options}
                        value={selected}
                        onChange={onChangeSubject}
                        labelledBy="Select" />
                        <Button onClick={handleSubmit} variant="contained" style={btnStyle} color="primary" fullWidth>{buttomLabel}</Button>
                        <Button onClick={resetForm} variant="contained" style={btnStyle} color="secondary" fullWidth>Reset</Button>
                    </FormControl>
                </Paper>
            </Grid>
        </div>
    );
}