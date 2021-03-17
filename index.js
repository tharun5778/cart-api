const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
var cors = require('cors')

app.use(cors())
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'sql6.freemysqlhosting.net',
    user: 'sql6399353',
    password: 'mxPQLehdnl',
    database: 'sql6399353'

});

//-----------------------//
//-------TABLES---------//
//       products
//       cartitems
//--------------------//


// mysqlConnection.connect((err)=>{
//     if(!err){
//         console.log('successfully connected...');
//         var sql = "INSERT INTO products (category, subCategory, productName, description, price) VALUES ('Electronics','Phones', 'oneplus 8T', 'OnePlus 8T 5G (Aquamarine Green, 8GB RAM, 128GB Storage) ', '42000')";
//         mysqlConnection.query(sql, function(err){
//             if(!err){
//                 console.log('1 record inserted...');
//             }else{
//                 console.log('failed to insert record...\n Error :'+ JSON.stringify(err,undefined,2));
//             }
//         });
//     }else{
//         console.log('connection failed...\n Error : '+JSON.stringify(err,undefined,2));
//     }
// });

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('successfully connected...');
    } else {
        console.log('connection failed...\n Error : ' + JSON.stringify(err, undefined, 2));
    }
});

app.get('/products', (req, res) => {
    mysqlConnection.query('SELECT * FROM products', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log('error while fetching data...\n Error : ' + JSON.stringify(err, undefined, 2));
        }
    })
})

app.get('/products/:productname', (req, res) => {
    var sql = 'SELECT * FROM products WHERE productName = \'' + req.params.productname + '\'';
    console.log(sql)
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log('error while fetching data...\n Error : ' + JSON.stringify(err, undefined, 2));
        }
    })
})

app.get('/cartItems', (req, res) => {
    var sql = 'SELECT * FROM cartitems INNER JOIN products ON cartitems.productID=products.id';
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log('error while fetching data...\n Error : ' + JSON.stringify(err, undefined, 2));
        }
    })
})

app.post('/cartItems', (req, res) => {
    var sql = 'INSERT INTO cartitems (quantity, productID) VALUES (\'' + req.body.quantity + '\',\'' + req.body.productID + '\')';
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log('error while fetching data...\n Error : ' + JSON.stringify(err, undefined, 2));
        }
    })
})

app.put('/cartItems', (req, res) => {
    var sql = 'UPDATE cartitems SET quantity= \'' + req.body.quantity + '\' WHERE productID=\'' + req.body.productID + '\'';
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log('error while fetching data...\n Error : ' + JSON.stringify(err, undefined, 2));
        }
    })
})

app.delete('/cartItems', (req, res) => {
    var sql = 'DELETE FROM cartitems WHERE productID=\'' + req.body.productID + '\'';
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log('error while fetching data...\n Error : ' + JSON.stringify(err, undefined, 2));
        }
    })
})



app.listen(4000, () => console.log('Server is running at port no 4000'));

// id int(10) NOT NULL AUTO_INCREMENT, category VARCHAR(225) DEFAULT NULL, subCategory VARCHAR(225) DEFAULT NULL, productName VARCHAR(225) DEFAULT NULL, description VARCHAR(1500) DEFAULT NULL, price int(10) DEFAULT NULL, PRIMARY KEY (id) 
// CREATE TABLE cartitems (orderID int(10) NOT NULL AUTO_INCREMENT, productID int(10) DEFAULT NULL, quantity int(10) DEFAULT NULL, PRIMARY KEY (orderID))