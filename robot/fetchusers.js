//Axios request supports
// Make XMLHttpRequests from the browser
// Make http requests from node.js
// Supports the Promise API
// Intercept request and response
// Transform request and response data
// Cancel requests
// Automatic transforms for JSON data
// Client side support for protecting against XSRF

const axios = require('axios');

const users = async(inputname = '') => {
    try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        const users = response.data;

        const filterData = users.filter( item => {
            let userNameToLower = item.name.toLowerCase();
            let nameToLower = inputname.toLowerCase();
            return userNameToLower.includes(nameToLower);
        })

        return filterData;
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
    getUsers: users
}