const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var authenticate = require("../authenticate");
const cors = require("./cors");
const Favorites = require("../models/favorite");
const {Dishes} = require('../models/dishes');
const {User} = require('../models/user');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter
    .route("/")
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors,authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({'user':req.user.id})
        .populate('user')
        .populate('dishes')
        .then(
            (favorite) => {
                if(favorite !== null){                 
                    console.log("Favorite found.");
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(favorite);                           
                }
                else{
                    console.log("No favorite found.");
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(null);
                }
            }
        );}
    )
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({'user':req.user.id})
        .then(
                (favorite) => {
                    const idObjList = req.body;
                    const idList = Array.from(idObjList, (idObj) => idObj._id);
                    Dishes.find({'_id':{ $in: idList}}).then(
                        (dishes) => {                       
                            const dishList = []
                            dishes.forEach(element => dishList.push(element.id));
                            if(favorite!==null){
                                favorite.dishes = [...new Set(favorite.dishes.concat(dishList))];
                                favorite.save()
                                .then(
                                    (savedFavorite) => {
                                        console.log("List of ids inserted.");
                                        res.statusCode = 200;
                                        res.setHeader("Content-Type", "application/json");
                                        res.json(savedFavorite);
                                });
                            }
                            else{
                                const newFavorite = {
                                    user:req.user.id,
                                    dishes:dishList
                                }
                                Favorites.create(newFavorite)
                                .then(
                                    (savedFavorite) => {
                                        console.log("List of ids inserted.");
                                        res.statusCode = 200;
                                        res.setHeader("Content-Type", "application/json");
                                        res.json(savedFavorite);
                                    });
                            }
                        }
                        
                    );      
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operation not supported on /favorites");
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOneAndRemove({'user':req.user.id})
        .then(
            (result) => {
                console.log("Deleted all favorites.");
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(result);
            }         
        )
        .catch((err) => next(err));
    });

favoriteRouter
    .route("/:dishId")
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, (req, res, next) => {
        res.statusCode = 403;
        res.end("GET operation not supported on /favorites/"+ req.params.dishId);
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.find({'user':req.user.id})
        .then(
            (favorite) => {
                if(favorite.length===0){
                    Dishes.findById(req.params.dishId)
                    .then(
                        (dish) => {
                            if(dish!==null){
                                const newFavorite = {
                                    user: req.user.id,
                                    dishes: [req.params.dishId]
                                }
                                Favorites.create(newFavorite)
                                .then(
                                    (newFavorite) => {
                                        console.log("Favorite Created ", newFavorite);
                                        res.statusCode = 200;
                                        res.setHeader("Content-Type", "application/json");
                                        res.json(newFavorite);
                                    }
                                )
                            }
                            else{
                                console.log("Error creating ", req.params.dishId);
                                res.statusCode = 400;
                                res.setHeader("Content-Type", "application/json");
                                res.json({error: "The requested dishId does not exist in the server."});
                            }
                        }
                    ); 
                }
                else{
                    Dishes.findById(req.params.dishId)
                    .then(
                        (dish) => {
                            if(dish!==null){
                                const favoriteItem = favorite.pop();
                                if(!favoriteItem.dishes.includes(req.params.dishId)){
                                    favoriteItem.dishes.push(req.params.dishId);
                                }
                                favoriteItem.save().then(
                                    (savedFavorite) => {
                                        console.log("Favorite updated ", savedFavorite);
                                        res.statusCode = 200;
                                        res.setHeader("Content-Type", "application/json");
                                        res.json(savedFavorite);
                                    }
                                )
                            }
                            else{
                                console.log("Error creating ", req.params.dishId);
                                res.statusCode = 400;
                                res.setHeader("Content-Type", "application/json");
                                res.json({error: "The requested dishId does not exist in the server."});
                            }
                        }
                    ,(err) => next(err));
                }
            }
        ).catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operation not supported on /favorites/" + req.params.dishId);
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.find({'user':req.user.id})
            .then(
                (favorite) => {
                    const myFavorite = favorite.pop();
                    if(myFavorite.dishes.includes(req.params.dishId)){
                        myFavorite.dishes = myFavorite.dishes.filter(item => item != req.params.dishId);
                    }
                    myFavorite.save()
                    .then(
                        (savedFavorite) => {
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.json(savedFavorite);
                        }
                    )
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    });


module.exports = favoriteRouter;