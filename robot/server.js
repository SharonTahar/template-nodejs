const exp = require('express'); //have all the information to encript the methods
const f_users = require('./fetchusers') //connects with the fetchusers file
// const bp = require('body-parser');
const app = exp();
// parse application/x-www-form-urlencoded
// app.use(bp.urlencoded({ extended: false }));
// // parse application/json
// app.use(bp.json())
app.use('/', exp.static(__dirname+'/public'));

// app.route('/user/:id')
//     .get((req,res)=>{
//         console.log(req.query);
//         const{username,password} = req.query;
//         const user = {
//             username,
//             password,
//             method: 'POST'
//         }
//         res.send(user)
// })

// //a get request in the server
// // app.get((req,res)=>{
// //     console.log(req.query);
// //     const{username,password} = req.query;
// //     const user = {
// //         username,
// //         password,
// //         method: 'GET'
// //     }
// //     res.send(user)
// // })

app.post('/robot', (req,res) => {
    console.log('POST', req.body);
    f_users.getUsers(req.body.id)
    .then(data => {
        res.send(data);
    })
    .catch(e => {
        res.status(404).send({err:'Data not found'});
    })
})

app.route('/logout')
    .get((req,res)=>{
        console.log(req.query);
        const{username,password} = req.query;
        const user = {
            username,
            password,
            method: 'POST'
        }
        res.send(user)
})

app.get('/user/:id', (req,res) => {
    console.log(req.params);
    res.send('OK');
})
app.listen(3000);