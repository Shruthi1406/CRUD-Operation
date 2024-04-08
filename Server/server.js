import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

//const express=require('express')
//const cors=require('cors')
//const mysql = require('mysql')
const app=express();
app.use(cors())
app.use(express.json());

const db=mysql.createConnection({
    
    host: 'localhost',
    user: 'root',
    password:'Shruthipatel@1242',
    database:'shruthi'

})
//console.log(db)

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080/'); // Replace with your frontend URL

    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');


    res.setHeader('Access-Control-Allow-Credentials', 'true');

    next();
});

app.listen(8080, ()=>{console.log('listen')})
app.get('/students', (req, res)=>{
    const sql="select * from Students ";
    db.query(sql, (err,result)=>{
        if(err) return res.json({Message:"Error inside server"});
        return res.json(result);
    })
})

db.on('error', (err) => {
    console.error('MySQL Pool Error:', err);
});

db.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database');
  });



app.post('/students', (req, res) => {
    const sql = "INSERT INTO Students (name, email, phone) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.phone
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting student:', err);
            return res.json({ error: 'Error inserting student' });
        }
        console.log('Student inserted successfully:', result);
        return res.json({ message: 'Student inserted successfully' });
    });
});


app.get('/read/:id', (req, res)=>{
    const sql="select * from Students where id=? ";
    const id=req.params.id;

    db.query(sql,[id], (err,result)=>{
        if(err) return res.json({Message:"Error inside server"});
        return res.json(result);
    })
})

app.put('/update/:id', (req, res)=>{
    const sql='UPDATE Students SET `name`=?,`email`=?,`phone`=? where id=?';
    const id=req.params.id;
    db.query(sql, [req.body.name, req.body.email, req.body.phone, id],(err,result)=>{
        if(err) return res.json({Message:"Error inside server"});
        return res.json(result);
    })


})

app.delete('/delete/:id',(req,res)=>{
    const sql="DELETE FROM students where id=?";
    const id=req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.jsonL({message:"error inside server"});
        return res.json(result);
    })

})

app.listen(8081,()=>{
    console.log("listening")
})
