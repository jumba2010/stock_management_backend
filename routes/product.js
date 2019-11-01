const express=require('express');
const Product=require('../models/product');
const router=express.Router();
 
//Cria Membro
router.post('/', async (req,res)=>{
    const {quantity,price,description,name,alertquantity,availablequantity,barcode,unityid,createdby}=req.body; 
    Product.create({quantity,price,description,name,alertquantity,availablequantity,barcode,unityid,createdby}).then(function(worker) {
        res.send(worker);
      })
});

//Actualiza Obreiro
router.put('/:id', async (req,res)=>{
  const {description,updatedby}=req.body;  
  User.update(
      {quantity,price,description,name,alertquantity,availablequantity,barcode,unityid,updatedate:Date.now(),updatedby},
      { where: { id:req.params.id} }
    )
      .then(result =>
          res.send(result)
      )
      .catch(err =>
        console.log(err)
      )    
});

//Actualiza Obreiro
router.put('/inativate/:id', async (req,res)=>{
  Product.update(
        { active:false,activationdate:Date.now(),activatedby},
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
 Product.findAll({offset: (6*page)-6, limit: 6,order: 'creationdate DESC' }).then(function(products) {
        res.send(products);
      });   
});

//Busca Todos os Membros
router.get('/', async (req,res)=>{
Product.findAll({order: 'creationdate DESC' }).then(function(products) {
      res.send(products);
    });   
});

//Busca total
router.get('/count/all/products', async (req,res)=>{   
  Product.count()
.then(function(total) {
  res.status(200).json({
    total: total
  });
});
});

module.exports=router;