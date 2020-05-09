const express=require('express');
const Stock=require('../models/stock');
const Product=require('../models/product');
const router=express.Router();
 
router.post('/', async (req,res)=>{
    const {productname,quantity,stocktype,sellprice,groupquantity,group,purchaseprice,providerid, productid,sucursalId,createdBy,activatedBy}=req.body; 
   
    //Se for saida de stoc
   if(stocktype==2){
     //Busca o stock antigo para abater o stock
    await  Stock.findAll({raw:true,where:{productid:productid}, order: [
      ['createdAt', 'ASC'],
    ], }).then(async function(stocks) {
      
      //Abate do Stock
      let difference=0;
      let final=false;
      for (let index = 0; index < stocks.length; index++) {
        const stock = stocks[index];
       
        if(index===0){
          difference=stock.availablequantity-quantity;
        }

        else {
          difference=difference+stock.availablequantity;

        }
        if(difference<0){
        await   Stock.update({ availablequantity:0}, 
          { where: { id:stock.id} }, 
          {fields: ['availablequantity']});
        
        }
        else if (!final){
          final=true;
          await   Stock.update({ availablequantity:difference}, 
            { where: { id:stock.id} }, 
            {fields: ['availablequantity']});
        }
        
      }

      await  Stock.create({ quantity:-quantity,stocktype,productname,
        sellprice,groupquantity,
        providerid,groupdescription:group?group.description:null,
        purchaseprice,availablequantity:0, 
        productid,sucursalId,createdBy,activatedBy});
        
      //Abate o stock no produto
       await Product.decrement({ availablequantity:quantity}, 
        { where: { id:productid} });
     
        res.status(200).json({
          result: 'sucesso'
        });
      
    })
   }

   //Acrescenta o stock no produto e actualiza o preco de venda
   else if (stocktype==1){
    Stock.create({ quantity,stocktype,productname,sellprice,groupquantity,providerid,groupdescription:group?group.description:null,purchaseprice,availablequantity:quantity, productid,sucursalId,createdBy,activatedBy}).then(async function(stock) {
      await Product.increment({availablequantity: quantity}, { where: { id:productid} });
      await Product.update( {sellprice, updatedBy:createdBy},
        { where: { id:productid} },
        {fields: ['sellprice','updatedBy']})     
        res.send(stock);
        })
   }
   
    
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