const express=require('express');
const Tax=require('../models/tax');
const router=express.Router();

 
//Cria Membro
router.post('/', async (req,res)=>{
    const {type,description,startdate,value,createdby,activatedby}=req.body; 
    Tax.create({ type,description,startdate,value,createdby,activatedby}).then(function(unity) {
        res.send(unity);
      })

});


//Actualiza Obreiro
router.put('/:id', async (req,res)=>{
    const {type,description,startdate,value,updatedby}=req.body;  
    User.update(
        {type,description,startdate,value,updatedate:Date.now(),updatedby},
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
 Tax.findAll().then(function(taxes) {
        res.send(taxes);
      });   
});


module.exports=router;