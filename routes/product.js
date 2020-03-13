const express=require('express');
const Product=require('../models/product');
const Unity=require('../models/unity');
const ProductTax=require('../models/producttax');
const Tax=require('../models/tax');
const router=express.Router();
 
//Cria Membro
router.post('/', async (req,res)=>{
    const {description,name,alertquantity,barcode,taxes,unityId,createdBy,activatedBy,sucursalId}=req.body; 
  Product.create({quantity:0,price:0,description,name,alertquantity,availablequantity:0,barcode,unityId,createdBy,activatedBy,sucursalId}).then(async function(product) {  
   for (let index = 0; index < taxes.length; index++) {
     const tax = taxes[index];
     await ProductTax.create({productId:product.id,taxId:tax.id,createdBy,activatedBy});
    }
    res.send(product);
      })
});

//Actualiza Obreiro
router.put('/:id', async (req,res)=>{
  const {description,updatedby,activatedby}=req.body;  
  User.update(
      {quantity,price,description,name,alertquantity,availablequantity,barcode,unityid,updatedate:Date.now(),updatedby,activatedby},
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
router.get('/:sucursalId', async (req,res,u)=>{

const { current = 1, pageSize = 6 } = req.query;
let newList=[];
await  Product.findAll({raw: true,where:{sucursalId:req.params.sucursalId}, order: [
  ['createdAt', 'DESC'],
], }).then(async function(products) {
    
for (let index = 0; index < products.length; index++) {
  const element = products[index];
let unity=await Unity.findOne({where :{id:element.unityId}});
element.unity=unity.description;
newList.push(element);
  
}

const result = {
      data: newList,
      total: newList.length,
      success: true,
      pageSize,
      current: parseInt(`${1}`, 6) || 1,
    };
  
    res.send(result);
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

const genList = (current, pageSize) => {
  const tableListDataSource = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      key: index,
      disabled: i % 6 === 0,
      href: 'https://ant.design',
      avatar: [
        'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
        'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
      ][i % 2],
      name: `TradeCode ${index}`,
      owner: '曲丽丽',
      desc: '这是一段描述',
      callNo: Math.floor(Math.random() * 1000),
      status: Math.floor(Math.random() * 10) % 4,
      updatedAt: new Date(),
      createdAt: new Date(),
      progress: Math.ceil(Math.random() * 100),
    });
  }

  tableListDataSource.reverse();
  return tableListDataSource;
};

module.exports=router;