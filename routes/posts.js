const express = require('express')
const router = express.Router()
const Inspecoes = require('../models/inspecoes')
const Inspetores = require('../models/inspetores')
const Motoristas = require('../models/motoristas')
const Pneus = require('../models/pneus')
const Veiculos = require('../models/veiculos')
const passport = require('passport');
const Usuarios = require('../models/usuarios')
const bcrypt = require('bcryptjs')



    
router.post('/motoristas', function(req,res){
   Motoristas.create({       
        nome: req.body.nome,
        email: req.body.email,
        contato: req.body.contato,
        matricula: req.body.matricula,
        desc_cargo: req.body.desc_cargo,
        desc_local: req.body.desc_local,
        tipo: req.body.tipo,
        categoria_cnh: req.body.categoria_cnh,
        validade: req.body.validade,      

    }).then(function(){
        req.flash('success_msg', "Motorista registrado com sucesso")
        res.redirect('/')
    }).catch(function(erro){
        req.flash('error_msg', "Houve um erro na registro do motorista")
        res.redirect('/')
    })
})

router.post('/inspetores', function(req,res){
    Inspetores.create({       
         nome: req.body.nome,
         email: req.body.email,
         contato: req.body.contato,
         matricula: req.body.matricula
          
 
     }).then(function(){
         req.flash('success_msg', "Inspetor registrado com sucesso")
         res.redirect('/')
     }).catch(function(erro){
         req.flash('error_msg', "Houve um erro na registro do inspetor")
         res.redirect('/')
     })
 })
    
router.post('/veiculos', function(req,res){
    Veiculos.create({
        placas: req.body.placas,        
        tipo: req.body.tipo,
        modelo: req.body.modelo,
        fabricante: req.body.fabricante,
        ano_fabr: req.body.ano_fabr,
        prefixo: req.body.prefixo,
        qteeixors: req.body.qteeixors,
        qteeixord: req.body.qteeixord,
        qteeixos: req.body.qteeixos,
        qtepneus: req.body.qtepneus,
        qteestepes: req.body.qteestepes,
        base: req.body.base            
    }).then(function(){
        req.flash('success_msg', "Veículo registrado com sucesso")
        res.redirect('/')
    }).catch(function(erro){
        req.flash('error_msg', "Houve um erro na registro do veículo")
        res.redirect('/')
    })
})

router.post('/Pneus', function(req,res){
    Pneus.create({
        nro_fogo: req.body.nro_fogo,
        dt_compra: req.body.dt_compra,
        nota_fiscal: req.body.nota_fiscal,
        fabricante: req.body.fabricante,
        modelo: req.body.modelo,
        largura: req.body.largura,
        perfil: req.body.perfil,
        tipo: req.body.tipo,
        diametro: req.body.diametro,
        carga_max: req.body.carga_max,
        pressao_max: req.body.pressao_max,
        ind_carga: req.body.ind_carga,
        ind_vel: req.body.ind_vel,
        dot: req.body.dot,
        severidade: req.body.severidade,
        local: req.body.local,
        eixo: req.body.eixo,
        lado: req.body.lado,
        posicao: req.body.local

    }).then(function(){
        req.flash('success_msg', "Pneu registrado com sucesso")
        res.redirect('/')
    }).catch(function(erro){
        req.flash('error_msg', "Houve um erro na registro do pneu")
        res.redirect('/')
    })
})    

router.post('/inspecao', function(req,res){
    Inspecoes.create({
        timestampStart: req.body.timestampStart,
        matriculaInspt: req.body.matriculaInspt,
        nomeInsp: req.body.nomeInsp,
        matriculaMot: req.body.matriculaMot,
        nomeMot: req.body.nomeMot,
        placas: req.body.placas,
        descVeic: req.body.descVeic,        
        quilometragem: req.body.quilometragem,
        nroFogo: req.body.nroFogo,  
        eixo: req.body.eixo,
        lado: req.body.lado,
        posicao: req.body.posicao,
        sulco: req.body.sulco,
        pressao: req.body.pressao,
        resultado: req.body.resultado,
        classificacao: req.body.classificacao,        
        observacoes: req.body.observacoes       
    }).then(function(){
        req.flash('success_msg', "Inspeção registrada com sucesso")
        res.redirect('/')
    }).catch(function(erro){
        req.flash('error_msg', "Houve um erro na registro da inspeção")
        res.redirect('/')
    })
})

router.post('/login',(req, res, next)=>{
    passport.authenticate('local',{
        successRedirect:'/admin/logo',
        failureRedirect:'/',
        failureFlash: true 
    })(req, res, next)
})

router.post('/cadastro',(req,res)=>{
    
    var erros=[]

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "Email inválido"})
    }

    if(!req.body.password || typeof req.body.password == undefined || req.body.password == null){
        erros.push({texto: "Senha inválida"})
    }
    
    if(req.body.password.length < 6){
        erros.push({texto: "A senha deve conter mais de 6 digitos"})
    }

    if(req.body.password != req.body.password2){
        erros.push({texto: "A senhas são diferentes, tente novamente"})
    }   

    if (erros.length >0){
        res.render('usuarios/cadastro',{erros: erros})            

    }else{
                           
        Usuarios.findOne({where :{email : req.body.email}}).then((usuario)=>{   
                                  
            if(usuario){
                req.flash('error_msg', 'Email já está cadastrado')
                res.render('usuarios/cadastro')
            }else{ 
                              
                const pass = req.body.password

                bcrypt.genSalt(10, (erro, salt)=>{
                    bcrypt.hash(pass,salt,(erro,hash)=>{
                        if(erro){
                            req.flash('error_msg', '1 Houve um erro na registro do usuário')
                            res.render('usuarios/cadastro')
                        }else{
                            const hashPass = hash
                            Usuarios.create({
                                email: req.body.email,
                                password: hashPass,
                                admin : 0
                            }).then(()=>{
                                req.flash('success_msg', "Usuário registrado com sucesso")
                                res.render('menus/logo')
                            }).catch((err)=>{
                                req.flash('error_msg', "2 Houve um erro na registro do usuário")
                                res.render('usuarios/cadastro')
                            }) 
                        }
                            
                    })

                })
               
                
            }
        }).catch((err)=>{
            req.flash('error_msg', "Houve um erro na registro do usuário")
            res.redirect('/usuarios/cadastros')
        })
        
    }
})  




module.exports = router