const express=require('express');
const Worker=require('../models/worker');
const router=express.Router();
 
//Cria Membro
router.post('/', async (req,res)=>{
    const {birthdate, picture, name,email,contact,category,address,isuser,createdby,activatedby}=req.body; 
    Worker.create({ birthdate, picture, name,email,contact,category,address,isuser,createdby,activatedby}).then(function(worker) {
        res.send(worker);
      })

});

//Actualiza Obreiro
router.put('/:id', async (req,res)=>{
    const {birthdate, picture, name,email,contact,category,address,isuser,updatedby}=req.body;  
    User.update(
        { birthdate, picture, name,email,contact,category,address,isuser,updatedate:Date.now(),updatedby},
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
router.get('/:page', async (req,res)=>{
    var page=req.params.page;
 Worker.findAll({offset: (6*page)-6, limit: 6,order: 'creationdate DESC' }).then(function(workers) {
        res.send(workers);
      });   
});

//Busca Obreiro pelo id
router.get('/unique/:id', async (req,res)=>{
   Worker.findOne({  where: { id:req.params.id}}).then(function(workers) {
    res.send(workers);
  });
  
});

//Busca total
router.get('/count/alll/workers', async (req,res)=>{   
  Worker.count()
.then(function(total) {
  res.status(200).json({
    total: total
  });
});
 
  
  
});

module.exports=router;