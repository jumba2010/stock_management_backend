const express=require('express');
const Stock=require('../models/stock');
const Product=require('../models/product');
const router=express.Router();
 
router.post('/', async (req,res)=>{
    const {quantity, productid,createdby}=req.body; 
    Stock.create({ quantity, productid,createdby}).then(function(worker) {
        res.send(worker);
      })
});

router.put('/:id', async (req,res)=>{
    const {quantity, productid,updatedby}=req.body;  
    Stock.update(
        { quantity, productid,updatedby,updatedate:Date.now()},
        { where: { id:req.params.id} }
      )
        .then(result =>
            res.send(result)
        )
        .catch(err =>
          console.log(err)
        )    
});

router.put('/decrement', async (req,res)=>{
  const {quantity,stockid, productid}=req.body;  
  Stock.decrement({ quantity}, { where: { stockid:stockid} });
  Product.decrement({ quantity}, { where: { productid:productid} });
});

router.put('/increment', async (req,res)=>{
  const {quantity,stockid, productid}=req.body;  
  Stock.increment({ quantity}, { where: { stockid:stockid} });
  Product.increment({ quantity}, { where: { productid:productid} });
});

router.get('/:page', async (req,res)=>{
    var page=req.params.page;
 Stock.findAll({offset: (6*page)-6, limit: 6,order: 'creationdate DESC' }).then(function(sstock) {
        res.send(sstock);
      });   
});

router.get('/', async (req,res)=>{
Stock.findAll({order: 'creationdate DESC' }).then(function(sstock) {
      res.send(sstock);
    });   
});

router.get('/count/all/stock', async (req,res)=>{   
  Stock.count()
.then(function(total) {
  res.status(200).json({
    total: total
  });
});
});

router.get('/betwen/:startdate/:endDate/:page', async (req,res)=>{
  var page=req.params.page;
Stock.findAll({ where: {
  creationdate: {
    $between: [req.params.startdate, req.params.enddate],
  }
}, 
  
  offset: (6*page)-6, limit: 6,order: 'creationdate DESC' }).then(function(sstock) {
      res.send(sstock);
    });   
});

router.get('/count/all/stock', async (req,res)=>{   
Stock.count()
.then(function(total) {
res.status(200).json({
  total: total
});
});
});

router.get('/count/betwen/:startdate/:endDate', async (req,res)=>{   
  Stock.count({where: {
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