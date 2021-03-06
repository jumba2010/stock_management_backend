const express=require('express');
const Provider=require('../models/provider');
const router=express.Router();
 
//Cria Membro
router.post('/', async (req,res)=>{
    const {picture, name,email,contact,createdby,activatedby}=req.body; 
    Provider.create({ picture, name,email,contact,createdby,activatedby}).then(function(worker) {
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
router.get('/:sucursalId', async (req,res)=>{
 Provider.findAll({where:{sucursalId:req.params.sucursalId}}).then(function(providers) {
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