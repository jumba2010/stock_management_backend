const express=require('express');
const Saleitem=require('../models/saleitem');
const router=express.Router();
 
//Cria Membro
router.post('/', async (req,res)=>{
    const {quantity,price,discount,saleid, stockid,createdby,activatedby}=req.body; 
    Saleitem.create({quantity,price,discount,saleid, stockid,createdby,activatedby}).then(function(worker) {
        res.send(worker);
      })
});

//Actualiza Obreiro
router.put('/inativate/:id', async (req,res)=>{
  Saleitem.update(
        { active:false,activationdate:Date.now(),activatedby,activatedby},
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
 Saleitem.findAll({offset: (6*page)-6, limit: 6,order: 'creationdate DESC' }).then(function(saleitems) {
        res.send(saleitems);
      });   
});


router.get('/bysaleid/:saleid', async (req,res)=>{
Saleitem.findAll( { where: { saleid:req.params.saleid} }).then(function(saleitems) {
      res.send(saleitems);
    });   
});

//Busca Todos os Membros
router.get('/', async (req,res)=>{
Saleitem.findAll({order: 'creationdate DESC' }).then(function(saleitems) {
      res.send(saleitems);
    });   
});

//Busca total
router.get('/count/alll/saleitems', async (req,res)=>{   
  Saleitem.count()
.then(function(total) {
  res.status(200).json({
    total: total
  });
});
});

//Busca Todos os Membros
router.get('/betwen/:startdate/:endDate/:page', async (req,res)=>{
  var page=req.params.page;
Saleitem.findAll({ where: {
  creationdate: {
    $between: [req.params.startdate, req.params.enddate],
  }
}, 
  
  offset: (6*page)-6, limit: 6,order: 'creationdate DESC' }).then(function(saleitems) {
      res.send(saleitems);
    });   
});

//Busca total
router.get('/count/alll/saleitems', async (req,res)=>{   
Saleitem.count()
.then(function(total) {
res.status(200).json({
  total: total
});
});
});

//Busca total
router.get('/count/betwen/:startdate/:endDate', async (req,res)=>{   
  Saleitem.count({where: {
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