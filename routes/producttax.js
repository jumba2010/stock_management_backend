const express=require('express');
const ProductTax=require('../models/producttax');
const router=express.Router();
 
//Cria Membro
router.post('/', async (req,res)=>{
    const {taxid,productid,createdby,activatedby}=req.body; 
    ProductTax.create({taxid,productid,createdby,activatedby}).then(function(worker) {
        res.send(worker);
      })
});

//Actualiza Obreiro
router.put('/inativate/:id', async (req,res)=>{
  ProductTax.update(
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

router.get('/:page', async (req,res)=>{
    var page=req.params.page;
 ProductTax.findAll({offset: (6*page)-6, limit: 6,order: 'creationdate DESC' }).then(function(producttaxes) {
        res.send(producttaxes);
      });   
});

router.get('/byproductid/:productid', async (req,res)=>{
  Saleitem.findAll( { where: { productid:req.params.productid} }).then(function(producttaxes) {
        res.send(producttaxes);
      });   
  });

router.get('/', async (req,res)=>{
ProductTax.findAll({order: 'creationdate DESC' }).then(function(producttaxes) {
      res.send(producttaxes);
    });   
});

//Busca total
router.get('/count/alll/producttaxes', async (req,res)=>{   
  ProductTax.count()
.then(function(total) { 
  res.status(200).json({
    total: total
  });
});
});

//Busca total
router.get('/count/alll/producttaxes', async (req,res)=>{   
ProductTax.count()
.then(function(total) {
res.status(200).json({
  total: total
});
});
});

module.exports=router;