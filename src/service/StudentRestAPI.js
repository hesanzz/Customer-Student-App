var students =[
    {id:1,name:"Lamia",cName:"8",pName:'Nayak',sName:'MCC', subject: 'Hindi'},
    {id:2,name:"Lilly",cName:"6",pName:'Laden',sName:'MMR', subject: 'History'},
    {id:3,name:"Rose",cName:"9",pName:'Mary',sName:'IJHS', subject: 'Maths'}
];

var apiEndPoint = "http://localhost:5000/api/student";
export var getStudents = () => {
    return fetch(apiEndPoint)
    .then(response => response.json())
    .then(data => {
        console.log(JSON.stringify(data))
        return data
    })
}

export var addStudent = (newStudent) =>{
    return fetch(apiEndPoint, {
        method: 'post',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
              },
            body:JSON.stringify(newStudent)
        })
      .then(response => response.json())
      .then(response => {
        return response;
    }).catch(function(error) {
      console.log(error);
  });
}

export var deleteStudent = (delStudent) =>{
    return fetch(apiEndPoint, {
        method: 'delete',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
              },
              body:JSON.stringify(delStudent)
        })
      .then(response => response.json())
      .then(response => {
        console.log(JSON.stringify(response));
        return(response);
        }).catch(function(error) {
            console.log(error);
    });
}

export var getStudentById = (id) =>{
    return fetch(apiEndPoint + "/"+id, {
        method: 'get',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
              }
        })
      .then(response => response.json())
      .then(response => {
        return response;
    }).catch(function(error) {
      console.log(error);
  });
}

export var updateStudent = (student) =>{
    return fetch(apiEndPoint, {
        method: 'put',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
              },
            body:JSON.stringify(student)
        })
      .then(response => response.json())
      .then(response => {
        return response;
    }).catch(function(error) {
      console.log(error);
  });
}