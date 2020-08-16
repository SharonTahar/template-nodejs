const exp = require('express');
const fs = require('fs');
const knex = require('knex');
const bp = require('body-parser');
const cors = require('cors');
const { response } = require('express');
const pws = require('p4ssw0rd');


const app = exp();


const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port: '5432', //default port can be checked in shell 
        user : 'postgres',
        password : 'panda007',
        database : 'hr'
      }
});

app.use(bp.urlencoded({extended:false}));
app.use(bp.json());
app.use(cors());

app.use(exp.static(__dirname+'/public'));

app.post('/login2', (req,res) => {
    const{username, password} = req.body;  //constructing the object username+password 
    db('login')
    .insert({
        username: username.toLowerCase(),
        password: pws.hash(password,10) // can also (req.body.password, 10) instead of constructing on line 31
    })
    .returning('*')
    .then(data => {
            res.send({message: `Welcome ${data[0].username} your id is ${data[0].id}`})
            
        })
    .catch(err => {
        db('login')
        .select('password')
        .where({username:username})
        .then(data => {
            if(pws.check(password, data[0].password,10)){
                res.send({message:'You are logged in'})
            }
            else{
                res.send({message:'incorrect password'})
            }
        })     
    });
});

// if(pws.check(password, data[0].password, 10))
// res.send({message: `Welcome ${data[0].username} your password is correct}`})

//does the username exist inside the table? 
app.post('/login', (req,res) =>{
    const{username,password} = req.body; //constructing the object username+password 
    db('login')
    .select('username', 'password')
    .where({username:username})
    .then(data => {
        console.log(data);
        if(data.length > 0){
            if(pws.check(password, data[0].password, 10)){
                res.send({message:`welcome ${data[0].username}, login successfully`})
            }
            else{
                res.send({message:'Check your password'})
            }
        }
        else{
            db('login')
            .insert({
                username: username,
                password: pws.hash(password,10)
            })
            .returning('*')
            .then(data => {
                res.send({message:`Welcome ${data[0].username} your id is ${data[0].id}`});
            })
            .catch(err => {
                res.send({message: 'Something wrong with your login please try again soon'})
            })
        }
        
    })
    .catch(err => {
        console.log(err);
        res.send({message:'Error'})
    })
});


// --------------------------------------
//checking the file system users, (by changing in the script fetch to reg instead of login)
app.post('/reg', (req,res) => {
    console.log(req.body);

let users = [];

try {
    const file_users = fs.readFileSync('./users');
    users = JSON.parse( file_users.toString() );
    }
catch(err){
    console.log('file does not exist');
    }

const filter_data = users.filter( user => {
    return user.username == req.body.username;
})
if (filter_data.length >= 1){
    res.send({message: "user already exist!!"})
}
else{
    users.push(req.body);
    fs.writeFile('./users', JSON.stringify(users) , err => {
        if(err){
            console.log(err);
        }
    })
    res.send({Message:'OK'});
    } 

})

app.listen(3000, () =>{
    console.log('listen on 3000')
});