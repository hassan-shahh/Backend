 const mysql = require('mysql');
const express = require('express');
const jswt = require('jsonwebtoken');
var app = express();
var cors = require('cors');
app.use(cors());
const bodyparser = require('body-parser');
app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shah11066',
    database: 'project',
    multipleStatements: true

});
mysqlConnection.connect((err) => {
    if (!err) {
        console.log('database is working fine')
    }
    else
        console.log('database connection failed \n error: ', + JSON.stringify(err, undefined, 2));
});
app.listen(4000, () => console.log('Express server is running at port 4000'));

/*
app.get('/employees', (req, res) => {
    mysqlConnection.query('Select * from employee', (err, rows, fields) => {
        if (!err)
            res.send(rows)
        else
            console.log(err)
    })

})
app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('Select * from employee where EmpID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows)
        else
            console.log(err)
    })
})

app.get('/:code', (req, res) => {
    mysqlConnection.query('Select * from employee where EmpCode = ?', [req.params.code], (err, rows, fields) => {
        if (!err)
            res.send(rows)
        else
            console.log(err)
    })
})
app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('Delete from employee where EmpID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
})
app.post('/employees', (req, res) => {
    let emp = req.body;
   var sql = "INSERT INTO employee VALUES (?,?,?,?);"
   mysqlConnection.query(sql,[emp.Emp,emp.Name,emp.EmpCode,emp.Salary], (err, rows, fields) => {
    if (!err)
    res.send(rows);
        else
            console.log(err)
    })

}) */
app.post('/signupp', (req, res) => {
    let emp = req.body;
   var sql = "INSERT INTO user(FirstName,LastName,Gender,BloodTag,Age,Address,ContactNo,Email,Password) VALUES (?,?,?,?,?,?,?,?,?);"
   mysqlConnection.query(sql,[emp.FirstName,emp.LastName,emp.Gender,emp.BloodTag,emp.Age,emp.Address,emp.ContactNo,emp.Email,emp.Password], (err, rows, fields) => {
    if (!err)
    res.send(rows);
        else
            console.log(err)
    })

})
app.get('/project', (req, res) => {
    mysqlConnection.query('Select * from user', (err, rows, fields) => {
        if (!err)
            res.send(rows)
        else
            console.log(err)
    })
})
app.post('/login', (req, res) => {
    let emp = req.body;
    mysqlConnection.query('Select * from user where Email =? AND Password = ?' , [emp.Email,emp.Password] , (err, rows, fields) => {
        if (!err)
        res.send(rows);
            else
                console.log(err);
        })
    
    })
    app.get('/types', (req, res) => {
        mysqlConnection.query('Select * from usertype', (err, rows, fields) => {
            if (!err)
                res.send(rows)
            else
                console.log(err)
        })
    })
   
    app.post('/asdf', (req, res) => {
        let emp = req.body;
       var sql = "INSERT INTO type(UserRoleID,UserName) VALUES (?,?);"
       mysqlConnection.query(sql,[emp.UserRoleID,emp.UserName], (err, rows, fields) => {
        if (!err)
        res.send(rows);
            else
                console.log(err)
        })
        
    
    })
    app.post('/loginauth', (req, res) => {
        let emp = req.body;
       
       mysqlConnection.query("SELECT * FROM user WHERE Email=? and Password =?",[emp.Email,emp.Password], (err, rows, fields) => {
        if (rows.length>0){
            res.send("Success")}
            else{
            res.send("Fail")}
        })
        
    
    })
    app.post('/loginauth', (req, res) => {
        let emp = req.body;
       
       mysqlConnection.query("SELECT * FROM user WHERE Email=? and Password =?",[emp.Email,emp.Password], (err, rows, fields) => {
        if (rows.length>0){
            res.send("Success")}
            else{
            res.send("Fail")}
        })
        
    
    })  
    
    app.post('/reservation', (req, res) => {
        let emp = req.body;
       
       mysqlConnection.query("INSERT INTO request(BloodTag,Status,Location,Donorcount,Dateofrequest,Cause,Blood_type) VALUES(?,?,?,?,?,?,?)",[emp.BloodTag,emp.Status,emp.Location,emp.Donorcount,emp.Dateofrequest,emp.Cause,emp.Bloodtype], (err, rows, fields) => {
        if (!err){
            res.send("Success")}
            else{
            console.log(err)}
        })
        
    
    })
    app.post('/show', (req, res) => {
        let emp = req.body;
       
       mysqlConnection.query("SELECT * FROM request WHERE BloodTag =?",[emp.BloodTag], (err, rows, fields) => {
        if (rows.length>0){
            res.send(rows)}
            else{
            res.send("No blood type found")}
        })
        
    
    }) 
   
    app.post('/log', (req, res) => {
        let emp = req.body;
     
       mysqlConnection.query("SELECT * FROM user WHERE Email=? and Password =?",[emp.Email,emp.Password], (err, rows, fields) => {
           if(rows.length>0){
               var users = {
                   id : rows[0].userID,
                   email : emp.Email
               }
           }
           else
                res.send("Fail")
        jswt.sign(users , 'secretkey', (err,token) => {
            if(!err)
            res.json({token})
            else
            console.log(err)
        })
    })
    
    })  

    function verifytoken(req,res,next){

        const bearerheader = req.headers['authorization'];
        if(typeof bearerheader !== 'undefined'){
         const arr=  bearerheader.split(" ")
         req.token = arr[1]
         next();
        }
        else
        res.sendStatus(403);

    }
    app.post('/authen' , verifytoken, (req,res) => {
        jswt.verify(req.token, 'secretkey' ,(err,dataa) =>{
            if(!err){
                res.json({
                    statement : "Accesss Granted",
                    dataa
                })
                }
                else
                res.sendStatus(403)
            })
        })
    
    
  