const db = require('./../database/dbConfig');
const bcrypt = require('bcryptjs');

async function addUser (user){
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
   const [id] = await db('users').insert(user);
   return findById(id)
}

function findById(id){
    return db('users').where('id', id).select('id', 'username').first();
}

function fetchUserBy(username){
    
    return db('users').where('username', username).first();
}
module.exports = {
    addUser,
    fetchUserBy
}