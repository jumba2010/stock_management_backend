const express=require('express');
const Category=require('../models/category');
const router=express.Router();

 
//Cria Membro
router.post('/', async (req,res)=>{
    const {code,description,createdby,activatedby}=req.body; 
    Category.create({ code,description,createdby,activatedby}).then(function(Category) {
        res.send(Category);
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
router.get('/:sucursalId', async (req,res)=>{ 
 Category.findAll({where:{sucursalId:req.params.sucursalId}}).then(function(unities) {
        res.send(unities);
      });   
});


module.exports=router;