const express=require('express');
const Profile=require('../models/profile');
const router=express.Router();

 
//Cria Membro
router.post('/', async (req,res)=>{
    const {code,description,createdby,activatedby}=req.body; 
    Profile.create({ code,description,createdby,activatedby}).then(function(result) {
        res.send(result);
      })

});


//Actualiza Obreiro
router.put('/:id', async (req,res)=>{
    const {description,updatedby,activatedby}=req.body;  
    Profile.update(
        {description,updatedate:Date.now(),updatedby,activatedby},
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
 Profile.findAll().then(function(profiles) {
        res.send(profiles);
      });   
});


module.exports=router;