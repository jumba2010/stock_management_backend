const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Unit=require('./unity');
const Category=require('./category');
const Group=require('./group');
const Sucursal=require('./sucursal');
const Product = sequelize.define('product', {
  description:Sequelize.STRING,
  canbesold: {field: 'can_be_sold',type:Sequelize.BOOLEAN,allowNull:false, validate: {notNull: true},defaultValue:true},
  name: {type:Sequelize.STRING,allowNull:false, validate: {notNull: true,notEmpty: true}},
  alertquantity: {type:Sequelize.INTEGER,allowNull:false, validate: {notNull: true}},
  availablequantity: {defaultValue:0,type:Sequelize.INTEGER,allowNull:false, validate: {notNull: true}},
  sellprice:{field: 'sell_price',type:Sequelize.DECIMAL},
  groupId: {
    type: Sequelize.INTEGER,
    field: 'gruoup_id',
    references: {
      model: Group,
      key: 'id', 
    }
  },
  groupquantity:{ field: 'group_quantity',type:Sequelize.STRING},
  groupdescription:{ field: 'group_description',type:Sequelize.STRING},
  barcode: {type:Sequelize.STRING,validate: {not: ["[a-z]",'i'] }},  
   unityId: {
    type: Sequelize.INTEGER,
    field: 'unity_id',
    references: {
      model: Unit,
      key: 'id', 
    }
  },
  
  unitydescription:{ field: 'unity_description',type:Sequelize.STRING},
  categoryId: {
    type: Sequelize.INTEGER,
    field: 'category_id',
    references: {
      model: Category,
      key: 'id', 
    }
  },
  categorydescription:{ field: 'category_description',type:Sequelize.STRING},
  sucursalId: {
    type: Sequelize.INTEGER,
    field: 'sucursal_id',
    references: {
      model: Sucursal,
      key: 'id', 
    },allowNull:false,
    validate: {notNull: true}
  },
  syncStatus: {type:Sequelize.INTEGER,allowNull:false,validate: {notNull: true},defaultValue:0},
  active:{type:Sequelize.BOOLEAN,defaultValue:true,allowNull:false, validate: {notNull: true}},
  createdBy:{type:Sequelize.INTEGER,  field: 'created_by',allowNull:false,validate: {notNull: true}},
  updatedBy:{type:Sequelize.INTEGER,  field: 'updated_by'},
  activatedBy: {type:Sequelize.INTEGER, field: 'activated_by',allowNull:false,validate: {notNull: true}},
  activationDate: {type:Sequelize.DATE, field: 'activation_date',allowNull:false,defaultValue: Sequelize.NOW,validate: {notNull: true}},
},
{
  defaultScope: {
    where: {
      active: true
    }
  },

  tableName:'product'
}
);

module.exports = Product;

