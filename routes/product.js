const express=require('express');
const Product=require('../models/product');
const Unity=require('../models/unity');
const ProductTax=require('../models/producttax');
const Stock=require('../models/stock');
const Category=require('../models/category');
const router=express.Router();
 
//Cria Producto
router.post('/', async (req,res)=>{
    const {groupquantity,purchaseprice,description,name,alertquantity,providerid,sellprice,barcode,taxes,group,unity,availablequantity,category,createdBy,activatedBy,sucursalId}=req.body; 
  Product.create({groupquantity,groupdescription:group?group.description:null,groupid:group?group.id:null,sellprice,description,name,alertquantity,categoryId:category?category.id:null,categorydescription:category?category.description:null,availablequantity,barcode,unityId:unity.id,unitydescription:unity.description,createdBy,activatedBy,sucursalId}).then(async function(product) {  
   for (let index = 0; index < taxes.length; index++) {
     const tax = taxes[index];
     await ProductTax.create({productId:product.id,taxId:tax,createdBy,activatedBy});
    }

if(availablequantity){

  await Stock.create({ quantity:availablequantity,productname:name,sellprice,groupquantity,providerid,groupdescription:group?group.description:null,purchaseprice,availablequantity, productid:product.id,sucursalId,createdBy,activatedBy});
}
   
res.send(product);
      
});
});

//Actualiza Produto
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

//Remove Produto
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


router.get('/unique/:id', async (req,res)=>{ 
let product =await  Product.findOne({raw: true,where:{id:req.params.id} });
let unity=await Unity.findOne({raw: true,where :{id:product.unityId}}); 
let category=await Category.findOne({raw: true,where :{id:product.categoryId}});
product.unity=unity; 
product.category=category; 
  
ProductTax.findAll({raw: true,where :{productId:req.params.id}}).then(async function(productTaxes) {
  let taxes=[];
  for (let index = 0; index < productTaxes.length; index++) {
    const element = productTaxes[index];
    taxes.push(element.taxId);
  }

product.taxes=taxes;

res.send(product);

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