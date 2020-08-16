const exp = require('express');
const bp = require('body-parser');
// const sendDatafun = require('./script')
const fs = require('fs');
const { response } = require('express');

const app = exp();
app.use('/', exp.static(__dirname+'/public'));

// parse application/x-www-form-urlencoded
app.use(bp.urlencoded({ extended: false }));
// parse application/json
app.use(bp.json())

app.post('/', (req,res)=>{
        console.log(req.body);
        let responseData = {
            message: '',
            users: []
        }
        let readUsers = fs.readFileSync('./some.txt')
        responseData.users = JSON.parse(readUsers);
        console.log('users' + responseData.users)
        if(userExist(responseData.users, req.body.username)) {
            throw new Error('Username already exist')
        }
        responseData.users.push(req.body)
        fs.writeFile('./some', JSON.stringify(responseData.users), err =>{
            if(err){
                console.log(err);
            }
            res.send(responseData)
        })
        // const{username,password} = req.body;
        // const user = {
        //     username,
        //     password,
        //     method: 'POST'
        // }
        // res.send(user);
})

const userExist = (array, username) => {
    const filterArray = array.filter(user =>{
        return user.username === username
    })
    return (filterArray.length > 0)
}


    // if(err){
    //     console.log(err);
    // }
    // else{
    //     let jsonFile = data.toString();
    //     let users = JSON.parse(jsonFile);
    //     console.log(users);
    //     // if(userExist())
    // }



// fs.appendFile('./some,txt', , err =>{
//     if(err){
//         console.log(err);
//     }
// })

app.listen(3000);





