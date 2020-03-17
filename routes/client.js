const express=require('express');
const Client=require('../models/client');
const router=express.Router();
 
//Cria Membro
router.post('/', async (req,res)=>{
    const {picture, name,email,contact,createdby,activatedby}=req.body; 
    Client.create({ picture, name,email,contact,createdby,activatedby}).then(function(worker) {
        res.send(worker);
      })

});

//Actualiza Obreiro
router.put('/:id', async (req,res)=>{
    const {picture, name,email,contact,updatedby,activatedby}=req.body;  
    User.update(
        { picture, name,email,contact,updatedate:Date.now(),updatedby,activatedby},
        { where: { id:req.params.id} }
      )
        .then(result =>
            res.send(result)
        )
        .catch(err =>
          console.log(err)
        )    
});

//Busca Todos Fornecedores
router.get('/:page', async (req,res)=>{
    var page=req.params.page;
 Client.findAll({offset: (6*page)-6, limit: 6,order: 'creationdate DESC' }).then(function(clients) {
        res.send(clients);
      });   
});

//Busca Obreiro pelo id
router.get('/unique/:id', async (req,res)=>{
   Client.findOne({  where: { id:req.params.id}}).then(function(clients) {
    res.send(clients);
  });
  
});

//Busca total
router.get('/count/alll/clients', async (req,res)=>{   
  Client.count()
.then(function(total) {
  res.status(200).json({
    total: total
  });
});
 
  
  
});

module.exports=router;