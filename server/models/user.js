const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
id: {
	type: String,
  required: true,
  unique: true
},
name: {
	type: String,
  required: true
},
email: {
	type: String,
  required: true,
  unique: true
},
password: {
	type: String,
  required: true
},
username: {
	type: String,
  required: true,
  unique: true
},
company: {
	type: String,
  required: true
},
role: {
	type: String,
  required: true
}
}, {
	collection: 'Users'
})

async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}
// static login method
UserSchema.statics.login = async function(email, password) {
	
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }
//if(password == user.password){match = true}else{match = false}
const match = await verifyPassword(password, user.password);
console.log(match);
console.log(match);

  //const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}
module.exports = mongoose.model('Users', UserSchema)