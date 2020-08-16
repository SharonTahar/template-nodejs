const ax = require('axios');

const getUsers = async()=>{
    try{
        const res = await ax.get('https://jsonplaceholder.typicode.com/users');
        const users = res.data;
        return users
    }
    catch(err) {
        console.log('Error: ', err);
    }
}

//in order to access it from a diffrent script
module.exports = {
    users: getUsers
}
