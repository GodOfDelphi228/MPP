const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let restaurantSchema = Schema({
    name: Schema.Types.String,
    description: Schema.Types.String,
    tier: mongoose.Schema.Types.Decimal,
    latitude: Schema.Types.Decimal,
    longitude: Schema.Types.Decimal
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
//var Restaurant  = mongoose.model('Restaurant', restaurantSchema);