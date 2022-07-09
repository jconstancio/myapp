const express = require('express')
const router = express.Router()
const Inspecoes = require('../models/inspecoes')
const Inspetores = require('../models/inspetores')
const Motoristas = require('../models/motoristas')
const Pneus = require('../models/pneus')
const Veiculos = require('../models/veiculos')
const {isAuth}= require('../helpers/isAuth')



router.get('/veiculos/:id', isAuth,(req,res)=>{
    
    Veiculos.findByPk(req.params.id).then(function(Veiculo){
        res.render('edits/veiculos',{Veiculo:Veiculo})
    })
})    

router.get('/pneus/:id', 
    function(req,res){
        Veiculos.findAll({attributes: ['placas'],order: [['placas','ASC']]}).then(
            function(Placas){
                Pneus.findByPk(req.params.id).then(
                    function(Pneu){
                        res.render('edits/pneus',{Pneu:Pneu,Placas:Placas})
                    }    
                )        
            }
        )
    }
)  

router.get('/motoristas/:id', isAuth,(req,res)=>{
    
    Motoristas.findByPk(req.params.id).then(function(Motorista){
        res.render('edits/motoristas',{Motorista:Motorista})
    })
}) 

router.get('/inspetores/:id', function(req,res){
    
    Inspetores.findByPk(req.params.id).then(function(Inspetor){
        res.render('edits/inspetores',{Inspetor:Inspetor})
    })
}) 




module.exports = router


