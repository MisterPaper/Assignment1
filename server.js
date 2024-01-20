/********************************************************************************** 
 * WEB422 – Assignment 1*
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy.*
 *  No part of this assignment has been copied manually or electronically from any other source* (including web sites)
 *  or distributed to other students.** 
 * Name: Adiel Student ID: 100068220 Date: January 19th, 2024* 
 * Cyclic Link: _______________________________________________________________
 * *********************************************************************************/
const express = require("express")
const cors = require("cors");
const app = express()

const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

const HTTP_PORT = process.env.PORT || 8080




require('dotenv').config();
app.use(cors());
app.use(express.json());

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(process.env.MONGODB_CONN_STRING)
    console.log(err);
});

app.get("/", (req, res) => {

    res.json({message: "API listening"});
})

app.post("/api/movies", (req, res) => {
    try {
        const movieObj = db.addNewMovie(req.body);

        movieObj.then(function(result){
            return res.status(201).json(result);
        })
    } catch(err)
    {
        return res.status(500).json({message: err})
    }

})

app.get("/api/movies/", (req, res) => {
    try{
        if(req.query.title != "")
        {
            const movieObj = db.getAllMovies(Number(req.query.page), Number(req.query.perPage), req.query.title);
            movieObj.then(function(result){
                return res.status(200).json(result)
            })
        }
        else
        {
            const movieObj = db.getAllMovies(Number(req.query.page), Number(req.query.perPage));
            movieObj.then(function(result){
                return res.status(200).json(result)
            })
        }

    }
    catch(err)
    {
        return res.status(500).json({message: err})
    }
})

app.get("/api/movies/:id", (req, res) => {
    try{
        const movieObj = db.getMovieById(req.params.id);
        movieObj.then(function(result){
            return res.status(200).json(result);
        })

    }
    catch(err)
    {
        return res.status(500).json({message: err})
    }
})

app.put("/api/movies/:id", (req, res) => {
    try{
        const movieObj = db.updateMovieById(req.body, req.params.id);

        movieObj.then(function(result){
            return res.status(200).json(result);
        })
    }
    catch(err)
    {
        return res.status(500).json({message: err})
    }
})

app.delete("/api/movies/:id", (req, res) => {
    try{
        const movieObj = db.deleteMovieById(req.params.id);
        movieObj.then(function(result){
            return res.status(204).json(result);
        })

    }
    catch(err)
    {
        return res.status(500).json({message: err})
    }
})

