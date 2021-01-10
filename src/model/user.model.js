const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user_id: { type: String, unique: true, required: true, index: true },
    display_name: { type: String, unique: false, },
    points: { type: Number, required: true, default: 0 },
    country_iso_code: { type: String }

});


schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.id;
    }
});

module.exports = mongoose.model('User', schema);