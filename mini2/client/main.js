
//REGISTER

//Enabling the register button
function successreg() {

  let first_name = document.getElementById('firstname');
  let last_name = document.getElementById('lastname');
  let email = document.getElementById('email');
  let username = document.getElementById('usernamereg');
  let password = document.getElementById('passwordreg');
  let button = document.getElementById('buttonreg');

  if(first_name.value === "" || last_name.value === "" || email.value === "" || username.value === "" || password.value === "" ) {

           button.disabled = true; 
       } else { 
           button.disabled = false;
       }
   }


const register = () => {
    let first_name = document.getElementById('firstname').value;
    let last_name = document.getElementById('lastname').value;
    let email = document.getElementById('email').value;
    let username = document.getElementById('usernamereg').value;
    let password = document.getElementById('passwordreg').value;
  
    const logindata = {
      first_name,
      last_name,
      email,
      username,
      password
    }
  
    fetchDataReg(logindata);
  }
  
  const fetchDataReg = (data) => {
    fetch('http://localhost:3001/register',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => showMessageReg(data));
  }
  
  const showMessageReg = (retdata) => {
     let root = document.getElementById('rootreg');
     root.innerHTML = "";
  
     if(retdata.message != ''){
       let div = document.createElement('H2');
       div.innerText = retdata.message;
       root.appendChild(div);
     }
  }



//LOGIN


  //Enabling the login button
function successlog() {

  let username = document.getElementById('username');
  let password = document.getElementById('password');
  let button = document.getElementById('buttonlog');

  if(username.value === "" || password.value === "" ) {

           button.disabled = true; 
       } else { 
           button.disabled = false;
       }
   }

  
  const login = () => {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
  
    const logindata = {
      username,
      password
    }
  
    fetchDataLogin(logindata);
  }
  
  const fetchDataLogin = (data) => {
    fetch('http://localhost:3001/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => showMessageLogin(data));
  }
  
  const showMessageLogin = (retdata) => {
  
     let root = document.getElementById('rootlog');
     root.innerHTML = "";
  
     if(retdata.message != ''){
       let div = document.createElement('H2');
       div.innerText = retdata.message;
       root.appendChild(div);
       location.replace("dashboard")
       
     }
  
  }





  //Dashboard
  


  