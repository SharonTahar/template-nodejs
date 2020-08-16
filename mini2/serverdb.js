const http = require('http');
const exp = require('express');
const bp = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const pws = require('p4ssw0rd');

//var passport = require('passport');

//let router = exp.Router();








const app = exp();



app.use(exp.static(__dirname + '/client'));

app.use( bp.urlencoded( {extended:false} ) );
app.use( bp.json() );

app.use(cors());



//ROUTES

app.route('/login')
    .get((req, res) => {
      res.sendFile(__dirname + '/client/login.html');
})

app.route('/register')
    .get((req, res) => {
      res.sendFile(__dirname + '/client/register.html');
})

app.route('/dashboard')
    .get((req, res) => {
      res.sendFile(__dirname + '/client/dashboard.html');
})







//DB CONNECTION
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'isaac',
    password : '12345',
    database : 'loginregister'
  }
});



//THE REGISTER

app.post('/register', (req, res) => {
  console.log(req.body);

 const { first_name,last_name,email,username, password } = req.body;

  console.log(first_name,last_name,email,username, password);

 let response_message='';

 db.transaction( trx => {
   return trx
     .insert({
          first_name: first_name,
          last_name: last_name,
          email: email.toLowerCase(),
          username: username,
          password: pws.hash(password,10),
          last_login: new Date()
      }, '*')
     .into('users')
      .then( data => {

        response_message = `OK Hello ${data[0].first_name} ${data[0].last_name}. your ID is ${data[0].user_id}`;
        
        return trx('login').insert(
          {
              username: username,
              password: pws.hash(password,10)
              //user_id: data[0].id
           }
        );
      });
 })
 .then( inserts => {
   res.send({message:response_message});
 })
 .catch( err => {
   res.send({message:err.detail});
 })

});



//THE LOGIN

app.post('/login', (req, res) => {

  db.select('username', 'password').from('login')
  .where('username', '=', req.body.username)
  .then(data => { 

    console.log('DATA IS:', data);
    
    //Check if the password input is valid with the one in the database
    const isValid = pws.check(req.body.password, data[0].password);

    console.log('The Password is:', isValid);

    if(isValid){

       return db.select('*').from('users')
         .where('username', '=', req.body.username)
         .then(user => {
      
            console.log('USER IS:', user);
    
            res.send({message: `OK Hello your username is ${data[0].username}`});

          })
          .catch( err => res.send({message:'NOT OK Username Or Password does not exist'}))
       
    } else {

        res.send({message:'NOT OK Username Or Password does not exist'});
    }

  })
  .catch( err => {

    console.log(err);

    res.send({message:'NOT OK Username Or Password does not exist'});
  })
  
});








//PORT FOR TESTING ON LOCAL:

//app.listen(3001);

 app.listen(3001, () => {
   console.log('app is running on port 3001');
 })













//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//See the users
// db.select('*').from('users').then(data => {
//   console.log(data);
// })

// //FOR LOCAL TESTING
// // Root Route
// app.get('/', (req, res)=> {
//   res.send(db.users);
// })

// // Root Route when app loads on server
// app.get('/', (req, res)=> {
//   res.send('it is working!')
// })




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//THE LOGIN BEFORE

// app.post('/login', (req, res) => {





//   const { username, password } = req.body;

//   //form input
//   //console.log(username, password);

//   let response_login_message='';

//   db('login')
//   .select('username', 'password')
//   .then( data => {

//     console.log('DATA IS:', data);

//     let u = data[0].username;

//     response_login_message = `OK Hello your username is ${u}`;

//     if(data.length > 0){

//       res.send({message: response_login_message});
    




//       //OTHER

//     //  // if(pws.check(password,data[0].password, 10)){
//     //       db('users')
//     //         //.join('login', 'users.id', 'login.user_id')
//     //         //.select('users.first_name', 'users.email','users.last_name','users.last_login')
//     //         //.where('users.id',data[0].user_id)
//     //         .then( data => {

//     //           console.log(data);

//     //           response_login_message = `OK Hello ${data[0].first_name} ${data[0].last_name} your username is ${data[0].username}`;

//     //           //response_login_message = `OK Hello ${data[0].first_name} ${data[0].last_name} your username is ${data[0].username} and your password is ${data[0].password}`;

//     //           //res.send([{message:`OK Hello ${data[0].first_name} ${data[0].last_name} your username is ${data[0].username}`, 'variant': 'success'}] );
//     //           res.send({message: response_login_message});
//     //         })
//     //         .catch( err => {
//     //           console.log(err);

//     //           res.send({message:'NOT OK Username Or Password does not exist'});
//     //         })
      
//     }


  
//   })
//   .catch( err => {

//     console.log(err);

//     res.send({message:'NOT OK Username Or Password does not exist'});
//   })
// })



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++










//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// //THE REGISTER ORIGINAL

// app.post('/register', (req, res) => {
//    console.log(req.body);

//   const { first_name,last_name,email,username, password } = req.body;

//    console.log(first_name,last_name,email,username, password);

//   let response_message='';

//   db.transaction( trx => {
//     return trx
//       .insert({
//            first_name: first_name,
//            last_name: last_name,
//            email: email.toLowerCase(),
//            created_date: new Date(),
//            last_login: new Date(),
//        }, '*')
//       .into('users')
//       .then( data => {
//         response_message = `OK Hello ${data[0].first_name} ${data[0].last_name}. your ID is ${data[0].id}`;
//         return trx('login').insert(
//           {
//               username: username,
//               password: pws.hash(password,10),
//               user_id: data[0].id
//            }
//         );
//       });
//   })
//   .then( inserts => {
//     res.send({message:response_message});
//   })
//   .catch( err => {
//     res.send({message:err.detail});
//   });


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//THE LOGIN ORIGINAL

// app.post('/login', (req, res) => {

//   const { username, password } = req.body;

//   db('login')
//   .where(
//     {
//       username,
//     })
//   .select('password','user_id','username')
//   .then( data => {
//     let u = data[0].username;
//     if(data.length > 0){
//       if(pws.check(password,data[0].password, 10)){
//           db('users')
//             .join('login', 'users.id', 'login.user_id')
//             .select('users.first_name', 'users.email','users.last_name','users.last_login')
//             .where('users.id',data[0].user_id)
//             .then( data => {
//               console.log(data);
//               res.send([{message:`OK Hello ${data[0].first_name} ${data[0].last_name} your username is ${u}`, 'variant': 'success'}] );
//             })
//             .catch( err => {
//               console.log(err);
//               res.send({message:'NOT OK Username Or Password does not exist'});
//             })
//       }
//       else{
//         res.send([{message:'NOT OK Username Or Password does not exist', 'variant': 'danger'}]);
//       }
//     }
//     else {
//       res.send([{message:'NOT OK Username Or Password does not exist', 'variant': 'danger'}]);
//     }
//   })
//   .catch( err => {
//     res.send([{message:'NOT OK Username Or Password does not exist', 'variant': 'danger'}]);
//   });
//   // const hash = pws.hash(password,10);
//   //
//   // console.log(pws.check('123456', hash, 10));

// });





  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // db.transaction( trx => {
  //    return trx('users')
  //    .returning('*')
  //    .insert({
  //         first_name: firstname,
  //         last_name: lastname,
  //         email: email.toLowerCase(),
  //         created_date: new Date(),
  //         login_date: new Date(),
  //     })
  //    .then( data => {
  //      response_message = `Hello ${data[0].first_name} ${data[0].last_name}. your ID is ${data[0].id}`;
  //      return trx('login')
  //      .returning('*')
  //      .insert({
  //          username: username,
  //          password: pws.hash(password,10),
  //          user_id: data[0].id
  //       })
  //
  //     })
  //     .then( data => {
  //         trx.commit
  //         res.send({message:response_message});
  //     })
  //     .catch( err => {
  //         trx.rollback
  //         res.send({message:err.detail});
  //     })
  //   })



//});


//PORT FOR TESTING ON LOCAL:

//app.listen(3001);

//  app.listen(3001, () => {
//    console.log('app is running on port 3001');
//  })
