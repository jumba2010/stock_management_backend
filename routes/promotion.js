const express=require('express');
const Promotion=require('../models/promotion');
const router=express.Router();

 
//Cria Membro
router.post('/', async (req,res)=>{
    const {percentage,description,enddate,createdby,activatedby}=req.body; 
    Promotion.create({percentage,description,enddate,createdby,activatedby}).then(function(unity) {
        res.send(unity);
      })

});


//Actualiza Obreiro
router.put('/:id', async (req,res)=>{
    const {percentage,description,enddate,updatedby,activatedby}=req.body;  
    User.update(
        {percentage,description,enddate,updatedby,activatedby,updatedate:Date.now()},
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
 Promotion.findAll().then(function(promotions) {
        res.send(promotions);
      });   
});


module.exports=router;