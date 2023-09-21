const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
name: {
	type: String,
	required: true,
},
catid: {
	type: String,
	required: true,
	unique: true
}
}, {
	collection: 'Categories'
})

module.exports = mongoose.model('Categories', CategorySchema)