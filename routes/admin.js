const express = require('express')
const router = express.Router()
const Motoristas = require('../models/motoristas')
const Veiculos = require('../models/veiculos')
const Pneus = require('../models/pneus')
const Inspetores = require('../models/inspetores')
const Inspecoes = require('../models/inspecoes')
const {isAuth}= require('../helpers/isAuth')


router.get('/inspecao',isAuth,(req,res)=>{   
  Pneus.findAll({order: [['nro_fogo','ASC']]}).then(function(Pneus){
    Veiculos.findAll({order: [['placas','ASC']]}).then(function(Veiculos){
      Motoristas.findAll({order: [['matricula','ASC']]}).then(function(Motoristas){
        Inspetores.findAll({order: [['matricula','ASC']]}).then(function(Inspetores){
          res.render('admin/inspecao', {Pneus:Pneus,Veiculos:Veiculos,Motoristas:Motoristas,Inspetores:Inspetores,Inspecoes:Inspecoes})
        })   
      })  
    })
  })
})

router.get('/logo',(req,res)=>{
  res.render('menus/logo')
})
router.post('/login',(req,res)=>{
  res.render('usuarios/login')
})

module.exports = router
