const express=require('express');
const Sale=require('../models/sale');
const router=express.Router();
 
//Cria Membro
router.post('/', async (req,res)=>{
    const {quantity,price,discount,saleid, stockid,createdby,activatedby}=req.body; 
    Sale.create({quantity,price,discount,saleid, stockid,createdby,activatedby}).then(function(worker) {
        res.send(worker);
      })
});

//Actualiza Obreiro
router.put('/inativate/:id', async (req,res)=>{
  Sale.update(
        { active:false,activationdate:Date.now(),activatedby,activatedby},
        { where: { id:req.params.id} }
      ).then(result =>
            res.send(result)
        )
        .catch(err =>
          console.log(err)
        )    
});

//Busca Todos os Membros
router.get('/:page', async (req,res)=>{
    var page=req.params.page;
 Sale.findAll({offset: (6*page)-6, limit: 6,order: 'creationdate DESC' }).then(function(sales) {
        res.send(sales);
      });   
});

//Busca Todos os Membros
router.get('/', async (req,res)=>{
Sale.findAll({order: 'creationdate DESC' }).then(function(sales) {
      res.send(sales);
    });   
});

//Busca total
router.get('/count/alll/sales', async (req,res)=>{   
  Sale.count()
.then(function(total) {
  res.status(200).json({
    total: total
  });
});
});

//Busca Todos os Membros
router.get('/betwen/:startdate/:endDate/:page', async (req,res)=>{
  var page=req.params.page;
Sale.findAll({ where: {
  creationdate: {
    $between: [req.params.startdate, req.params.enddate],
  }
}, 
  
  offset: (6*page)-6, limit: 6,order: 'creationdate DESC' }).then(function(sales) {
      res.send(sales);
    });   
});

//Busca total
router.get('/count/alll/sales', async (req,res)=>{   
Sale.count()
.then(function(total) {
res.status(200).json({
  total: total
});
});
});

//Busca total
router.get('/count/betwen/:startdate/:endDate', async (req,res)=>{   
  Sale.count({where: {
    creationdate: {
      $between: [req.params.startdate, req.params.enddate],
    }
  }})
  .then(function(total) {
  res.status(200).json({
    total: total
  });
  }); 
  });

module.exports=router;