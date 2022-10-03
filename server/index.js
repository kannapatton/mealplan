const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();


//middleware that parses info from front to backend
app.use(cors());
app.use(express.json());

console.log(process.env.API_PASSWORD);
const db = mysql.createConnection({
    user: 'root',
    host:'localhost',
    password: process.env.PASSWORD,
    database: 'mealplan'
});

app.post('/create', (req, res)=>{
    const sunday= req.body.sunday
    const monday= req.body.monday
    const tuesday= req.body.tuesday
    const wednesday= req.body.wednesday
    const thursday= req.body.thursday
    const friday= req.body.friday
    const saturday= req.body.saturday
   
    db.query('INSERT INTO dinner (sunday, monday, tuesday, wednesday, thursday, friday, saturday) VALUES (?,?,?,?,?,?,?)', 
    [sunday, monday, tuesday, wednesday, thursday, friday, saturday], 
    // callback function that represents what will happen after above statement is done
    (err, result) =>{
        if (err) {
            console.log(err)
        } else {
            res.send('Values Inserted');
        }
    }
    );
});

app.get('/menu', (req, res) =>{
    db.query("SELECT * FROM dinner", (err, result) =>{
        if (err){
            console.log(err)
        } else{
            res.send(result);
        }
    });
});





app.listen(3009, ()=>{
    console.log('yay server is running on 3009');
});