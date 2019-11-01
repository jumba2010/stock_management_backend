const express=require('express');
const Provider=require('../models/provider');
const router=express.Router();
 
//Cria Membro
router.post('/', async (req,res)=>{
    const {picture, name,email,contact,createdby}=req.body; 
    Provider.create({ picture, name,email,contact,createdby}).then(function(worker) {
        res.send(worker);
      })

});

//Actualiza Obreiro
router.put('/:id', async (req,res)=>{
    const {picture, name,email,contact,updatedby}=req.body;  
    User.update(
        { picture, name,email,contact,updatedate:Date.now(),updatedby},
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
 Provider.findAll({offset: (6*page)-6, limit: 6,order: 'creationdate DESC' }).then(function(providers) {
        res.send(providers);
      });   
});

//Busca Obreiro pelo id
router.get('/unique/:id', async (req,res)=>{
   Provider.findOne({  where: { id:req.params.id}}).then(function(providers) {
    res.send(providers);
  });
  
});

//Busca total
router.get('/count/alll/providers', async (req,res)=>{   
  Provider.count()
.then(function(total) {
  res.status(200).json({
    total: total
  });
});
 
  
  
});

module.exports=router;