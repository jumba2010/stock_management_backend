const express=require('express');
const Sale=require('../models/sale');
const Saleitem=require('../models/saleitem');
var moment = require('moment');
const router=express.Router();
 
//Cria Membro
router.post('/', async (req,res)=>{
  const {total,saleitems,sucursalId,createdBy}=req.body; 
  Sale.create({total,items:saleitems.length,sucursalId,createdBy, activatedBy:createdBy}).then(async function(sale) {
   
    for (let index = 0; index < saleitems.length; index++) {
      const item = saleitems[index];
  //Busca o stock mais antigo para abater
  let stockId;
  await  Stock.findAll({raw:true,where:{productid:item.id}, order: [
    ['createdAt', 'ASC'],
  ], }).then(async function(stocks) {
    
    //Abate do Stock
    let difference=0;
    let final=false;
    for (let index = 0; index < stocks.length; index++) {
      const stock = stocks[index];
     
      if(index===0){
        difference=stock.availablequantity-item.salequantity;
      }

      else {
        difference=difference+stock.availablequantity;

      }
      if(difference<0){
      await   Stock.update({ availablequantity:0}, 
        { where: { id:stock.id} }, 
        {fields: ['availablequantity']});
        stockId=stock.id;
      
      }
      else if (!final){
        final=true;
        await   Stock.update({ availablequantity:difference}, 
          { where: { id:stock.id} }, 
          {fields: ['availablequantity']});
          stockId=stock.id;
      }
    } 
  });
       
 //Abate o stock no produto
 await Product.decrement({ availablequantity:item.salequantity}, 
  { where: { id:item.id} });

  await  Saleitem.create({productname:item.name,productid:item.id,quantity:item.salequantity,price:item.sellprice,saleid:sale.id, stockid:stockId,createdBy,activatedBy:createdBy}).then(function(worker) {
    res.send(worker);
  });  

}

res.send(sale);
  
  });     
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
router.get('/:sucursalId', async (req,res)=>{
    let today = new Date();
    let afterLimit=moment([today.getFullYear(), today.getMonth(), today.getDate()]);
   
    var newList=[];
    await Sale.findAll({ where: { date: afterLimit.utc().format("YYYY-MM-DD"), sucursalId: req.params.sucursalId} }).then(function(sales) {
      
      for (let index = 0; index < array.length; index++) {
        const element = sales[index];
        let items=await Saleitem.findAll({ raw: true,where:{saleid:element.id}, order: [
          ['createdAt', 'DESC'],
   ], });

   element.items=items;
   newList.push(element);   
      
  }
  
  res.send(newList);
     
     
     
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