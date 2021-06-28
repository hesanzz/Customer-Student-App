var customers =[
    {id:1,name:"Vivek",email:"vivek@abc.com",phone:'9724232344',address:'Gujarat, India'},
    {id:2,name:"Speeka",email:"sipeeks@abc.com",phone:'7878787837',address:'Gujarat, India'},
    {id:3,name:"Pari",email:"pari@abc.com",phone:'7878787837',address:'Ahmedabad, India'}
];
var apiEndPoint = "http://localhost:5000/api/customer";
export var apiLogin = "http://localhost:5000/login";
export var getCustomers = () => {
    return fetch(apiEndPoint)
    .then(response => response.json())
    .then(data => {
        console.log(JSON.stringify(data))
        return data
    })
}
export var addCustomer = (customer) =>{
    return fetch(apiEndPoint, {
        method: 'post',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
              },
            body:JSON.stringify(customer)
        })
      .then(response => response.json())
      .then(response => {
        return response;
    }).catch(function(error) {
      console.log(error);
  });
}

export var deleteCustomer = (customer) =>{
        return fetch(apiEndPoint, {
            method: 'delete',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                  },
                  body:JSON.stringify(customer)
            })
          .then(response => response.json())
          .then(response => {
            console.log(JSON.stringify(response));
            return(response);
            }).catch(function(error) {
                console.log(error);
            });
}
export var getCustomerById = (id) =>{
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
export var  updateCustomer = async (customer) =>{
    return fetch(apiEndPoint, {
        method: 'put',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
              },
            body:JSON.stringify(customer)
        })
      .then(response => response.json())
      .then(response => {
        return response;
    }).catch(function(error) {
      console.log(error);
  });
}
