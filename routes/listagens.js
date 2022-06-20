const express = require('express')
const router = express.Router()
const Inspecoes = require('../models/inspecoes')
const Inspetores = require('../models/inspetores')
const Motoristas = require('../models/motoristas')
const Pneus = require('../models/pneus')
const Veiculos = require('../models/veiculos')
const { Sequelize } = require('../models/db')


router.get('/inspecoes', function(req,res){
  Inspecoes.findAll({order: [['id','DESC']]}).then(function(Inspecoes){
    res.render('listagens/listaIns', {Inspecoes : Inspecoes})
  })   
})

router.get('/motoristas',(req,res)=>{
  Motoristas.findAll({order: [['id','DESC']]}).then(function(Motoristas){
    res.render('listagens/listaMot', {Motoristas : Motoristas})
  })
})


router.get('/inspetores',(req,res)=>{
  Inspetores.findAll({order: [['id','DESC']]}).then(function(Inspetores){
    res.render('listagens/listaInspt', {Inspetores : Inspetores})
  })
})

router.get('/veiculos', function(req,res){
  Veiculos.findAll({order: [['id','DESC']],}).then(function(Veiculos){
    res.render('listagens/listaVei', {Veiculos : Veiculos})
  })   
})

router.get('/pneus',(req,res)=>{  
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