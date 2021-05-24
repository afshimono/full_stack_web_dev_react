import {UserSchema} from './user';
import {dishSchema} from './dishes';

const Dishes = require("./dishes")
const User = require("./user")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    user: UserSchema,
    dishes: [dishSchema]
})