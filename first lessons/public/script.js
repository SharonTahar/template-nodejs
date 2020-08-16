//To get an object with the get 
//  const sendData = () => {
//     let user = document.getElementById('username').value;
//     let pass = document.getElementById('password').value;
//     // console.log(user,pass)
//     fetch('http://localhost:3010/login?username='+user+'%password='+pass)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }

//to show an object in the console in the post 
const sendData = () => {
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;
    // console.log(user,pass)
    let userObj= {
        usename:user,
        password:pass
    }

    fetch('http://localhost:3010/login',{
        method:'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(userObj)
    })
    .then(res => res.json())
    .then(data => {
        showUserData(data);
    })
    .catch(err => {
        console.log(err);
    })
}

const showUserData = (obj) => {
    const root = document.getElementById('root');
    const h2 = document.createElement('h2')
    const h4 = document.createElement('h4')
    const txt = document.createElement('p')
    h2.innerText = obj.username;
    h4.innerText = obj.password;
    txt.innerText = obj.method;
    root.innerHTML='';
    root.appendChild(h2);
    root.appendChild(h4);
    root.appendChild(txt);
}