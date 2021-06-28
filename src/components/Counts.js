import React, {useState, useEffect} from "react";
import {getStudents} from '../service/StudentRestAPI';
import {getCustomers} from '../service/CustomerAPI';
import './styles.css';

const Counts = () => {
    var fetchStudentLists = async() => {
        var studentLists = await getStudents();
        setStudents(studentLists);
    }

    var fetchCustomers = async() => {
        var listCustomers = await getCustomers();
        setCustomers(listCustomers);
    }    

    useEffect(() => {
        fetchStudentLists();
        fetchCustomers();
    }, [])

    const [students, setStudents] = useState([]);
    const [customers, setCustomers] = useState([]);
    console.log("students", students);
  return (
    <div>
    <div className="geo-coord-display">
        <div className="count-label">Total number of students</div>
        <div className="count-value">{students && students.length ? students.length : 0}</div>
    </div>
    <div className="geo-coord-display">
        <div className="count-label">Total number of customers</div>
        <div className="count-value">{customers && customers.length ? customers.length : 0}</div>
    </div>      
    </div>
  );
};

export default Counts;
