const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');
const Usuarios = require('../models/usuarios')

router.get('/cadastros',(req,res)=>{
    res.render('usuarios/cadastro')
})

module.exports = router;

