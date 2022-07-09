const db = require('./db')
const Usuarios = db.sequelize.define('usuarios',{   
    email: {type: db.Sequelize.STRING},
    password: {type: db.Sequelize.STRING},
    admin: {type: db.Sequelize.STRING}

   
   
})

//Usuarios.sync({force:true})
module.exports = Usuarios