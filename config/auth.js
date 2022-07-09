

const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Usuarios = require('../models/usuarios');
 
module.exports = function(passport){ 

    passport.use(new localStrategy({usernameField: 'email',passwordField: 'password'},(email, password, done)=>{
        Usuarios.findOne({where: {email: email}}).then((usuario) => {
                      
           
            if(!usuario){
                
               return done(null, false, {message: 'Usuario não cadastrado'})
            }
            
            bcrypt.compare(password,usuario.password, (erro, checked)=>{
                if(checked){
                    return done(null, usuario)
                }else{
                    return done(null, false, {message: 'Senha incorreta'})                    
                }
            })
        })

    }))
    

    passport.serializeUser(function(usuario, cb) {
        process.nextTick(function() {
          cb(null, { id: usuario.id});
        });
      });
      
      passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
          return cb(null, user);
        });
      });


}    