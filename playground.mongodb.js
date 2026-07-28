/* MongoDB Playground - HashCrack Security DB */

// Select the database to use
use('hashcrack_db');

// 1. View all user records (Username, SHA256_Hash, Salt, Salted_Hash, Created_Time)
db.getCollection('users').find({});

// 2. Find a specific user by username (e.g. 'khushal')
// db.getCollection('users').find({ Username: 'khushal' });

// 3. Count total stored password hash records
// db.getCollection('users').countDocuments({});
