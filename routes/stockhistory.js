const express=require('express');
const StockHistory=require('../models/stockhistory');
const router=express.Router();
 
//Cria Membro
router.post('/', async (req,res)=>{
    const {quantity, productid,createdby}=req.body; 
    StockHistory.create({ quantity, productid,updatedate:Date.now(),createdby}).then(function(worker) {
        res.send(worker);
      })
});

//Actualiza Obreiro
router.put('/:id', async (req,res)=>{
    const {quantity, productid,updatedby}=req.body;  
    User.update(
        { quantity, productid,updatedby},
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
  StockHistory.findAll({order: 'creationdate DESC' }).then(function(sstock) {
      res.send(sstock);
    });   
});

//Busca Todos os Membros
router.get('/:page', async (req,res)=>{
    var page=req.params.page;
 StockHistory.findAll({offset: (6*page)-6, limit: 6,order: 'creationdate DESC' }).then(function(stockHistory) {
        res.send(stockHistory);
      });   
});


//Busca total
router.get('/count/alll/stockHistory', async (req,res)=>{   
  StockHistory.count()
.then(function(total) {
  res.status(200).json({
    total: total
  });
});
});

//Busca Todos os Membros
router.get('/betwen/:startdate/:endDate/:page', async (req,res)=>{
  var page=req.params.page;
StockHistory.findAll({ where: {
  creationdate: {
    $between: [req.params.startdate, req.params.enddate],
  }
}, 
  
  offset: (6*page)-6, limit: 6,order: 'creationdate DESC' }).then(function(stockHistory) {
      res.send(stockHistory);
    });   
});

//Busca total
router.get('/count/alll/stockHistory', async (req,res)=>{   
StockHistory.count()
.then(function(total) {
res.status(200).json({
  total: total
});
});
});

//Busca total
router.get('/count/betwen/:startdate/:endDate', async (req,res)=>{   
  StockHistory.count({where: {
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