const mysql = require('mysql')

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test2'
  });

connection.connect((err)=>{
    if(!err) console.log('i am connected')

    else console.log('not connected')
    
})

module.exports = connection