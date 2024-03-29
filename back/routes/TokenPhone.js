let express = require('express')
let router = express.Router();
let tokenPhoneServices = require('../services/tokenPhoneServices.js')
const notificacionPush = require('../notificaciones/notificacionPush.js')
router.get('/', (req,res)=>{
    tokenPhoneServices.getAll((err, token)=>{
        if (!err) {
            res.json({ status: true, token }); 
        }else{
            res.json({ status:false, message: err }); 
        }
    }) 
})

router.get('/byToken/:token', (req,res)=>{
    tokenPhoneServices.getByToken(req.params.token, (err, token)=>{
        if (!err) {
            res.json({ status: true, token }); 
        }else{
            res.json({ status:false, message: err }); 
        }
    }) 
})


router.post('/enviar', (req,res)=>{
    tokenPhoneServices.getAll((err, token)=>{
        if (!err) {
            token.map(e=>{
                console.log(e.tokenPhone)
                notificacionPush(e.tokenPhone, req.body.titulo, req.body.mensaje)
            })
            res.json({ status: true, token }); 
        }else{
            res.json({ status:false, message: err }); 
        }
    })
})

router.post('/', (req, res)=>{
	tokenPhoneServices.getByToken(req.body.tokenPhone, (err, tokenPhone)=>{
        if(!err){
            if(!tokenPhone){
                tokenPhoneServices.create(req.body,  (err, token)=>{
                    if (!err) {
                        res.json({ status: true, message: 'Token Creado', token });
                    }else{
                        res.json({ status:false, message: err }); 
                    }
                })	
            }else{
                editarLoc(req, res, tokenPhone)
            }
        }
    })	 
})

router.put('/', (req, res)=>{
	tokenPhoneServices.getByToken(req.body.token, (err, tokenPhone)=>{
        if(!err){
            if(tokenPhone){
                tokenPhoneServices.updateEstado(tokenPhone._id, req.body.showNotificacion, (err1, token)=>{
                    if (!err1) {
                        res.json({ status: true, message: 'Token actualizado', token });
                    }else{
                        res.json({ status:false, message: err1 }); 
                    }
                })	
            }else{
                res.json({ status:false, message: "este token no existe", err }); 
            }
        }
    })	 
})


const editarLoc=(req, res, token)=>{
    tokenPhoneServices.editarLoc(token._id, req.body, (err, tokenPhone)=>{
        if (!err) {
            res.json({ status: true, tokenPhone }); 
        }else{
            res.json({ status:false, message: err }); 
        }
    })

   
}

module.exports = router;