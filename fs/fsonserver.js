const fs = require('fs');
// console.log('Hi from file system from my Node js server');

// fs.readFile('./sometexet.txt', (err,data) => {
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(data.toString());
//     }
// })

//to readfilesync its a method to read the text before it continues
// const f = fs.readFileSync('./sometexet.txt');
// console.log(f.toString());
// console.log('after');

// let thedata = ' terepf fewfl pl wse';
// fs.appendFile('./some', thedata, err =>{
//     if(err){
//         console.log(err);
//     }
// })

// let arr = [
//     { username: 'ziv', password:'23455'},
//     { username: 'Sharon', password:'11123'},
//     { username: 'rafael', password:'4433'},
// ]

//writing to a file and overwriting 
// let writeToFiledata = 'sharon@gmail.com';
// fs.writeFile('./datatext.txt',JSON.stringify(arr), err => {
//     if(err){
//         console.log(err);
//     }
// })

// fs.readFile('./datatext.txt', (err,data) => {
//     if(err){
//         console.log(err);
//     }
//     else{
//         let jsonFile = data.toString();
//         let users = JSON.parse(jsonFile);
//         console.log(users); // TO SHOW SPECIFIC USER users[2].username)
//     }
// })

//To delete a file 
// fs.unlink('./some', err => {
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log('file deleted');
//     }
// })

//to create a copy of text to a different file, overwrites the previous txt and will put the new
fs.copyFile('./sometexet.txt','./some1.txt', err =>{
    if(err){
        console.log(err);
    }
})


