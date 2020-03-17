const express=require('express');
const Stock=require('../models/stock');
const Product=require('../models/product');
const router=express.Router();
 
router.post('/', async (req,res)=>{
    const {productname,stocktype,sellprice,groupquantity,group,purchaseprice,providerid, productid,sucursalId,createdBy,activatedBy}=req.body; 
    Stock.create({ quantity:availablequantity,stocktype,productname,sellprice,groupquantity,providerid,groupdescription:group?group.description:null,purchaseprice,availablequantity, productid,sucursalId,createdBy,activatedBy}).then(function(stock) {
        res.send(stock);
      })
});

router.put('/:id', async (req,res)=>{
    const {productname,stocktype,sellprice,groupquantity,groupdescription,quantity, productid,updatedby,activatedby}=req.body;  
    Stock.update(
        { productname,stocktype,sellprice,groupquantity,groupdescription,quantity, productid,updatedby,activatedby,updatedate:Date.now()},
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
  Stock.decrement({ availablequantity:quantity}, { where: { stockid:stockid} });
  Product.decrement({ availablequantity:quantity}, { where: { productid:productid} });
});

router.put('/increment', async (req,res)=>{
  const {quantity,stockid, productid}=req.body;  
  Stock.increment({availablequantity: quantity}, { where: { stockid:stockid} });
  Product.increment({availablequantity: quantity}, { where: { productid:productid} });
});


router.get('/:sucursalId', async (req,res)=>{
Stock.findAll({raw:true,where:{sucursalId:req.params.sucursalId}, order: [
  ['createdAt', 'DESC'],
  ['productname', 'ASC'],
], }).then(function(stocks) {

      const result = {
        data: stocks,
        total: stocks.length,
        success: true,
        pageSize:6,
        current: parseInt(`${1}`, 6) || 1,
      };
    
      res.send(result);
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