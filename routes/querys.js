const express = require('express')
const router = express.Router()
const Inspecoes = require('../models/inspecoes')

router.get('/inspecoes/:nrofogo',(req,res)=>{
    Inspecoes.findAll({where: {'nrofogo' : req.params.nrofogo},order: [['id','DESC']]}).then(
        function(Inspecoes){
            res.send(Inspecoes)  
        }
    )  
})         




module.exports = router