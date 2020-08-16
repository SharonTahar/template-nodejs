const my_usr = require('./newserver.js');
// console.log(my_usr.users());

my_usr.users()
.then(res=>{
    console.log(res)
})
.catch(err=> {
    console.log('Error ', err)
});