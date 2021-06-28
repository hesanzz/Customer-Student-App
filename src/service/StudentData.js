var students =[
    {id:1,name:"Lamia",cName:"8",pName:'Nayak',sName:'MCC', subject: 'Hindi'},
    {id:2,name:"Lilly",cName:"6",pName:'Laden',sName:'MMR', subject: 'History'},
    {id:3,name:"Rose",cName:"9",pName:'Mary',sName:'IJHS', subject: 'Maths'}
];

var updateStorage = () => {
    localStorage.setItem('students', JSON.stringify(students));
}

if(localStorage.getItem('students') == null) {
    updateStorage();
} else {
    students = JSON.parse(localStorage.getItem('students'));
}

export var getStudents = () => {
    return students;
}

export var addStudent = (newStudent) =>{
    students.push(newStudent);
    updateStorage();
}

export var deleteStudent = (studentId) =>{
    var list = students.filter((item)=>(item.id != studentId))
    students = list;
    updateStorage();
}

export var getStudentById = (id) =>{
    var list = students.filter((item)=>(item.id == id))
    if(list.length > 0){
        return list[0];
    }else{
        return {};
    }
}

export var updateStudent = (student) =>{
    for(var i =0 ; i<students.length; i++){
        if(students[i].id == student.id){
            students[i] = student;
            break;
        }
    }
    updateStorage();
}