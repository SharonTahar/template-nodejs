const knex = require('knex');

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

// console.log(
//     db.select('*').from('login')
// );

// retrieve data
// db('countries')
// .select('country_name')
// .where({country_id:'IL'})
// .then(data => {
//     console.log(data);
// })
// .catch(err => {
//     console.log(err);
// })

// Updating data in the db
// db('countries')
// .where({country_id:'WK'})
// .update(
//     {
//         country_id: 'KW',
//         country_name: 'Kuwait'
//     }
// )
// .returning('*')
// .then(data => {
//     console.log(data);
// })
// .catch(err => {
//     console.log(err);
// })

//inserting data to DB
// db('countries')
// .insert (
//     [
//         {
//             country_id: 'KW',
//             country_name: 'Kuwait',
//             region_id: 4
//         },
//         {
//             country_id: 'KZ',
//             country_name: 'Zuwait',
//             region_id: 4
//         }
//     ]
// )
// .returning('*')
// .then(data => {
//     console.log(data);
// })
// .catch(err => {
//     console.log(err);
// })


//Deleting data 
// db('countries')
// .where({country_id:'KW'})
// .del()
// .then(data => {
//     console.log(data);
// })
// .catch(err => {
//     console.log(err);
// })



// db('countries')
// .insert (
//     [
//         {
//             country_id: 'KW',
//             country_name: 'Kuwait',
//             region_id: 4
//         },
//         {
//             country_id: 'KZ',
//             country_name: 'Zuwait',
//             region_id: 4
//         }
//     ]
// )
// .returning('*')
// .then(data => {
//     console.log(data);
// })
// .catch(err => {
//     console.log(err);
// })

db('login')
.select 
    ('id', 'username', 'password')
    case when (req.body.username = username) 
    .then ('User already exist')
	else 
    .insert (
        [
            {
                // id: req.body[i],
                username: req.body.username,
                password: req.body.password
            }
        ]
    )
.returning('*')
.then(data => {
    console.log(data);
})
.catch(err => {
    console.log(err);
})