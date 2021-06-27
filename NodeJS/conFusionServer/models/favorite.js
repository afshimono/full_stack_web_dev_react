
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    user: {
        type: String,
        required: true,
        unique: true,
    },
    dishes: [{
        type: String,
        required: true,
        unique: true,
    }]
},
{
    timestamps: true,
});

var Favorites = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorites;