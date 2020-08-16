const exp = require('express');
const bp = require('body-parser');
const fs = require('fs');

const app = exp();

app.use(exp.static(__dirname+ '/public'));
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

// let allowCrossDomain = (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     next();
// }
// app.use(allowCrossDomain);

app.post('/', (req, res) => {
    console.log(req.body);

    let items = [];

    const item = {
        item:req.body.item,
        quantity: req.body.quantity
    }

    try {
        const f = fs.readFileSync('./groceries');
        items = JSON.parse(f);

    } catch (e) {
        // console.log('no file');
    } finally {
        items.push(item);
    }

    fs.writeFile('./groceries', JSON.stringify(items), err => {
        if(err){
            console.log(err);
        }
    });

    res.send(items)
});

app.listen(3000);