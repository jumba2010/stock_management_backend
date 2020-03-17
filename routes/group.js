const express=require('express');
const Group=require('../models/group');
const router=express.Router();

 
//Cria Membro
router.post('/', async (req,res)=>{
    const {description,createdby,activatedby}=req.body; 
    Group.create({ description,createdby,activatedby}).then(function(Group) {
        res.send(Group);
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
 Group.findAll({where:{sucursalId:req.params.sucursalId}}).then(function(unities) {
        res.send(unities);
      });   
});

module.exports=router;