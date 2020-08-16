const searchRobot = () => {
    let name = document.getElementById('id').value;
    fetch('http://localhost:3000/robot',{
        method:'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({id:name})
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        displayData(data);
    })
    .catch(err=>{
        console.log(err);
    })
}

const displayData = (data) => {
    const root = document.getElementById('root');
    root.innerHTML = '';
    for (i in data){
        let div = document.createElement('div');
        let img = document.createElement('img');
        img.setAttribute('src', `https://robohash.org/${i}?size=200x200`);
        let title = document.createElement('h4');
        title.innerText = data[i].name;
        let username = document.createElement('p');
        username.innerText = data[i].username;
        let email = document.createElement('h6');
        email.innerText = data[i].email;

        div.classList.add('card');
        div.appendChild(img);
        div.appendChild(title);
        div.appendChild(username);
        div.appendChild(email);
        root.appendChild(div); 
    }


}