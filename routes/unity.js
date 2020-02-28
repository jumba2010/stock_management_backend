const express=require('express');
const Unity=require('../models/unity');
const router=express.Router();

 
//Cria Membro
router.post('/', async (req,res)=>{
    const {code,description,createdby,activatedby}=req.body; 
    Unity.create({ code,description,createdby,activatedby}).then(function(unity) {
        res.send(unity);
      })

});


//Actualiza Obreiro
router.put('/:id', async (req,res)=>{
    const {description,updatedby}=req.body;  
    User.update(
        { description,updatedate:Date.now(),updatedby},
        { where: { id:req.params.id} }
      )
        .then(result =>
            res.send(result)
        )
        .catch(err =>
          console.log(err)
        )    
});

//Busca Todos os Membros
router.get('/', async (req,res)=>{  
 Unity.findAll().then(function(unities) {
        res.send(unities);
      });   
});


module.exports=router;