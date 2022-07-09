  //MODULOS
  const express = require('express')
  const handlebars = require('express-handlebars')
  const bodyParser = require('body-parser')
  const app = express()  
  const admin = require('./routes/admin')
  const path = require('path')
  const session = require('express-session')
  const flash = require('connect-flash')
  const passport = require('passport')
  //const env = require('dotenv').load();
  
  require('./config/auth')(passport)   
  const {isAuth}= require('./helpers/isAuth')   
  
  const cadastros = require('./routes/cadastros')
  const listagens = require('./routes/listagens') 
  const posts = require('./routes/posts')
  const updates = require('./routes/updates')
  const dels = require('./routes/dels')
  const edits = require('./routes/edits')
  const querys = require('./routes/querys')
  const usuarios = require('./routes/usuarios')  
 
 
  app.use(session({
  secret: 'android',
  resave: true,
  saveUninitialized:true  
  })) 
  app.use(passport.initialize())
  app.use(passport.session())    
  app.use(flash()) 
     
  app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
  })

  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())

  app.engine('handlebars', handlebars.engine({defaultLayout: 'main',
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    }
  }))    
  app.set('view engine','handlebars')  
  app.use(express.static(path.join(__dirname,'public')))
  
  app.use('/admin',admin) 
  app.use('/usuarios',usuarios) 
  app.use('/cadastros',cadastros) 
  app.use('/listagens',listagens) 
  app.use('/posts',posts)
  app.use('/updates',updates)       
  app.use('/dels',dels) 
  app.use('/edits',edits) 
  app.use('/querys',querys) 
  
  app.get('/',(req,res)=>{
    res.render('usuarios/login')
  })   
  
  app.listen(8081)
  //app.listen(process.env.PORT || 5000)