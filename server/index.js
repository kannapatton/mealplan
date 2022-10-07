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
// app.put('/update', (req, res) =>{
//     const id = req.body.id 
//     const wage = req.body.wage;
//     db.query("UPDATE dinner SET monday = ? WHERE id = ?",
//     [monday, id],
//     (err, result) =>{
//         if (err) {
//             console.log(err)
//         } else{
//             res.send(result);
//         }
//     });
// });
app.post('/signup', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    db.query('INSERT INTO users (username, password) VALUES (?,?)', 
    [username, password], 
    // callback function that represents what will happen after above statement is done
    (err, result) =>{
        if (err) {
            console.log(err)
        } else {
            res.send('Values Inserted');
        }
    }
    );

})
app.get('/login', (req, res) =>{
    const { username, password } = req.body;
  
    let sql = "SELECT * FROM users WHERE username = ?";
    sql = mysql.format(sql, [username]);
  
    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err);
      if (!results.length) return res.status(404).send("No matching users");
  
      const hash = results[0].password;
      bcrypt.compare(password, hash).then((result) => {
        if (!result) return res.status(400).send("Invalid password");
  
        const data = { ...results[0] };
        data.password = "REDACTED";
  
        const token = jwt.sign(data, process.env.JWT_SECRET, {expiresIn: "3h"})
                  res.json({
                      msg: "Logged in " + username,
                      token
        });
      });
    });
});
app.delete('/delete/:iddinner', (req, res) => {
    const iddinner = req.params.iddinner;
    db.query("DELETE FROM dinner WHERE iddinner = ?", iddinner, (err, result) => {
        if (err) {
            console.log (err);
        } else {
            res.send(result);
        }
    });
    });




app.listen(3009, ()=>{
    console.log('yay server is running on 3009');
});