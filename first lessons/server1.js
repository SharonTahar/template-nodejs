// const http = require('http');

// const server = http.createServer( (req,res) => {
//     // console.log(req.method);
//     res.setHeader('Content-type', 'application/json');
//     const user = {
//         firstname: 'Dan',
//         lastname: 'DanDan'
//     }
//     res.end(JSON.stringify(user));
// });
// server.listen(3010);

//initilize request server
const exp = require('express');
const bp = require('body-parser');

const app = exp();

app.use('/', exp.static(__dirname+'/public'));

// parse application/x-www-form-urlencoded
app.use(bp.urlencoded({ extended: false }));
// parse application/json
app.use(bp.json())

app.get('/login', (req,res)=>{
    console.log(req.query);
    const {username,password} = req.query;
    // let u = req.query.username
    // let p = req.query.password
    const user = {
        username, 
        password,
        method: 'GET'
    }
    res.send(user)
});

app.post('/login', (req,res)=>{
    console.log(req.body);
    const {username,password} = req.body;
    const user = {
        username,
        password,
        method: 'POST'
    }
    res.send(user)
});

app.listen(3010);