const sendData = () => {
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;
   
    let userObj= {
        usename:user,
        password:pass
    }
    // console.log(userObj);
    fetchData(userObj)
}
const fetchData = (data) => {
    fetch('http://localhost:3000',{
        method:'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => sayHi(data))
}
    // .catch(err=>{
    //     console.log(err);
    // })


const sayHi = (sharon) =>{
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;
    let root = document.getElementById('root');
    root.innerHTML = '';
    console.log('message' + sharon.message)
}
