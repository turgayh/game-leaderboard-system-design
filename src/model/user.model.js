const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isoCountries } = require('../helper/country-code')
const schema = new Schema({
    user_id: { type: String, unique: true, required: true, index: true },
    display_name: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number },
    country: { type: isoCountries, default: isoCountries.TR }
});


schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.id;
        delete ret.country;
    }
});

module.exports = mongoose.model('User', schema);