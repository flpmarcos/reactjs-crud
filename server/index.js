const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
const mysql = require("mysql");

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"ReactCrudDatabase"

})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/api', (req, res) => {
    let result = 'health';
    res.send(result);
});

app.get('/api/movie', (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect,(err,result)=>{
        res.send(result);
    })
    
});

app.post("/api/movie/new",(req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_reviews (movieName,movieReview) VALUES (?,?)";
    db.query(sqlInsert,[movieName,movieReview],(err,result)=>{
        console.log(result);
    });
}); 

app.put("/api/movie/update",(req,res) =>{
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    
    const sqlUpdate = 
        "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
    
    db.query(sqlUpdate,[movieReview,movieName],(err,result) => {
        if(err) console.log(err);
    })
});

app.delete("/api/movie/delete/:movieName",(req,res) =>{
    const name = req.params.movieName;
    const sqlDelete = 
        "DELETE FROM movie_reviews WHERE movieName = ?";
    
    db.query(sqlDelete,name,(err,result) => {
        if(err) console.log(err);
    })
});


 
app.listen(port, () => {
    console.log(`Server is listening at http: //localhost:port`)
}) 