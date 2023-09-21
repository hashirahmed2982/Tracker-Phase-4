const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CompanySchema = new Schema({
name: {
	type: String,
	required: true
},
id: {
	type: String,
	required: true,
	unique: true
},
currency: {
	type: String,
	required: true
},
timezone: {
	type: String,
	required: true,
},
compid: {
	type: String,
	required: true,
	unique: true
}
}, {
	collection: 'Companies'
})

module.exports = mongoose.model('Companies', CompanySchema)