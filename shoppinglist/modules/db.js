const knex = require('knex');
const pws = require('p4ssw0rd');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'panda007',
    database : 'hr'
  }
});

const createUser = ({ username,email, password }) => {
  return db('users')
    .returning('*')
    .insert({username: username,
             email: email.toLowerCase(),
             password: pws.hash(password,10),
             createdat: new Date(),
             updatedat: new Date()});
}

const findUser = (username) => {
  return db.select('*')
    .from('users')
    .where({username})
}


module.exports = {
  findUser,
  createUser
};
