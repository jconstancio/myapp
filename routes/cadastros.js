const express = require('express')
const router = express.Router()
const Emparelhamentos = require('../models/emparelhamentos')
const Pneus = require('../models/pneus')
const Veiculos = require('../models/veiculos')
const Inspetores = require('../models/inspetores')
const {isAuth}= require('../helpers/isAuth')


router.get('/emparelhamentos/:placa',isAuth,(req,res)=>{   
    Pneus.findAll({order: [['nro_fogo','ASC']]}).then(        
        function(Pneus){
            var placa = req.params.placa
            res.render('cadastros/emparelhamentos',{Pneus:Pneus,placa})
        }
    )
})        

router.get('/motoristas',isAuth,(req,res)=>{
    res.render('cadastros/motoristas')
})

router.get('/inspetores',isAuth,(req,res)=>{
    res.render('cadastros/inspetores')
})

router.get('/pneus',isAuth,(req,res)=>{
    Veiculos.findAll({attributes: ['placas'],order: [['placas','ASC']]}).then(
        function(Placas){
            res.render('cadastros/pneus',{Placas:Placas})
        }
    )    

})

router.get('/veiculos',isAuth,(req,res)=>{
    res.render('cadastros/veiculos')
})



router.post('/teste/:placas',isAuth,(req,res)=>{
    Emparelhamentos.findAll({where: {'placas' : req.params.placas}
    }).then(function(Emparelhamentos){
      res.send(Emparelhamentos)  
    })  
})     

module.exports = router