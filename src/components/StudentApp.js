import React, { useState } from 'react';
import Menu from './Menu';
import {getStudents, addStudent, getStudentById, deleteStudent, updateStudent} from '../service/StudentData';

var students =[
    {id:1,name:"Lamia",cName:"8",pName:'Nayak',sName:'MCC', subject: 'Hindi'},
    {id:2,name:"Lilly",cName:"6",pName:'Laden',sName:'MMR', subject: 'History'},
    {id:3,name:"Rose",cName:"9",pName:'Mary',sName:'IJHS', subject: 'Maths'}
];

export function StudentApp() {

    const [students, setStudents] = useState(getStudents());
    const [name, setName] = useState("");
    const [cName, setCName] = useState("");
    const [pName, setPName] = useState("");
    const [sName, setSName] = useState("");
    const [subject, setSub] = useState("");
    const [buttomLabel, setLable] = useState("Add");
    const [id, setId] = useState(0);

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
    
    var removeStudent = (id) => {
        deleteStudent(id);
        setStudents(getStudents());
        console.log("deleted id", id);
    }
    var editStudent = (id) => {
        let selectedStudent = getStudentById(id);
        setId(selectedStudent.id);
        setName(selectedStudent.name);
        setCName(selectedStudent.cName);
        setPName(selectedStudent.pName);
        setSName(selectedStudent.sName);
        setSub(selectedStudent.subject);
        setLable('Update');
        console.log("edited id", id);
    }

    var handleSubmit = (e) => {
        e.preventDefault();
        if (!name.length) {
            return;
        }
        const newStudent = {
            name,cName, pName, sName, subject
        }
        if(id == 0) {
            newStudent.id = Date.now();
            addStudent(newStudent);
            setStudents(getStudents());
        } else {
            var list = students.filter((item) => (item.id == id));
            if(list.length > 0) {
                list[0].name = name;
                list[0].cName = cName;
                list[0].pName = pName;
                list[0].sName = sName;
                list[0].subject = subject;
                updateStudent(list[0]);
                setStudents(getStudents());
            }
        }
        resetForm();
    }

    return (
        <div>
            <Menu/>
            <h2>Students List</h2>
            <form onSubmit={handleSubmit}>
            <input
                placeholder="Name"
                name="setName"
                onChange={handleChange}
                value={name}
            /><br/><br/>
            <input
                name="setCName"
                placeholder="Class Name"
                onChange={handleChange}
                value={cName}
            /><br/><br/>
            <input
                name="setPName"
                placeholder="Parent Name"
                onChange={handleChange}
                value={pName}
            /><br/><br/>
            <input
                name="setSName"
                placeholder="School Name"
                onChange={handleChange}
                value={sName}
            /><br/><br/>
            <input
                name="setSub"
                placeholder="Subject"
                onChange={handleChange}
                value={subject}
            /><br/><br/>
            <input type="button" value={buttomLabel} onClick={handleSubmit} />&nbsp;&nbsp;
            <input type="button" value="Reset" onClick={resetForm} />
            </form>
            <TodoList students = {students}
            removeStudent = {removeStudent}
            editStudent = {editStudent} />

        </div>
    );
}

function TodoList({students,removeStudent,editStudent}) {
    return (
        <div>
        <table style={{width:"100%"}}>
        <thead>
        <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Class</th>
        <th>Parent Name</th>
        <th>Address</th>
        <th>Subject</th>
        <th></th>
        <th></th>
        </tr>
        </thead>
        <tbody>
            {students.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td id={item.id}>{item.name}</td>
                        <td>{item.cName}</td>
                        <td>{item.pName}</td>
                        <td>{item.sName}</td>
                        <td>{item.subject}</td>
                        <td><button onClick={()=> editStudent(item.id)}>Edit</button></td>
                        <td><button onClick={()=> removeStudent(item.id)}>Delete</button></td>                
                    </tr>
                    ))}
        </tbody>
        </table>
        </div>
    );
}