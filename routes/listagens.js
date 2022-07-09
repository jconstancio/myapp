const express = require('express')
const router = express.Router()
const Inspecoes = require('../models/inspecoes')
const Inspetores = require('../models/inspetores')
const Motoristas = require('../models/motoristas')
const Pneus = require('../models/pneus')
const Veiculos = require('../models/veiculos')
const {isAuth}= require('../helpers/isAuth')



router.get('/inspecoes', isAuth,function(req,res){
  Inspecoes.findAll({order: [['id','DESC']]}).then(function(Inspecoes){
    res.render('listagens/listaInsp', {Inspecoes : Inspecoes})
  })   
})

router.get('/motoristas',isAuth,(req,res)=>{
  Motoristas.findAll({order: [['id','DESC']]}).then(function(Motoristas){
    res.render('listagens/listaMot', {Motoristas : Motoristas})
  })
})


router.get('/inspetores',isAuth,(req,res)=>{
  Inspetores.findAll({order: [['id','DESC']]}).then(function(Inspetores){
    res.render('listagens/listaInspt', {Inspetores : Inspetores})
  })
})

router.get('/veiculos',isAuth,(req,res)=>{
  Veiculos.findAll({order: [['id','DESC']],}).then(function(Veiculos){
    res.render('listagens/listaVei', {Veiculos : Veiculos})
  })   
})

router.get('/pneus',isAuth,(req,res)=>{  
    Pneus.findAll({order: [['id','DESC']]}).then(function(Pneus){
        Veiculos.findAll({attributes: ['placas'],order: [['placas','ASC']]}).then(function(Placas){
            res.render('listagens/listaPne', {Pneus:Pneus,Placas:Placas})
          }
        )   
      }
    )
  }
)
module.exports = router