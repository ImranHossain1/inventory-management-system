const mongoose = require("mongoose");
const validator = require("validator");
const {ObjectId}= mongoose.Schema.Types;
// schema design

const stockSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        required: true,
        ref: "Product"
    },
    name : {
      type: String,
      required: [true, "Please provide a name for this Stock!"],
      trim: true, //Remove unused spaces
      // unique: [true, "This name is already taken, please choose a different name"],
      lowercase: true,
      minLength: [3, 'Name must be at least 3 characters.'],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true
    },
    unit : {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag."
      }
    },
    imageURLS: [{
      type: String,
      required: true,
      validate: [validator.isURL, "Please provide valid url(s)"]
    }],
    price: {
        type: Number,
        required: true,
        min: [0,"Product price can't be Negative"]
    },
    quantity: {
        type: Number,
        required: true,
        min: [0,"Product quantity can't be Negative"]
    },
    
    category: {
      type: String,
      required: true,
    },
    brand:{
      name:{
        type: String,
        required: true
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      }
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "status can't be {VALUE}"
        }
    },
    store:{
        name: {
            type: String,
            trim: true,
            required: [true, "Please provide a store name"],
            enum: {
                values: ["dhaka", "chattogram", "rajshahi", "sylhet", "khulna", "barishal", "rangpur", "mymensingh"],
                message:"{VALUE} is not a valid name"
            },
            lowercase:true
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Store"
        }
    },
    suppliedBy:{
        name: {
            type: String,
            trim: true,
            required: [true, "Please provide a Supplier Name"]
        },
        id: {
            type: ObjectId,
            ref:'Supplier'
        }
    },
    sellCount:{
      type: Number,
      default:0,
      min: 0
    }
  },{
    timestamps : true
  })
  //mongoose middlewares for saving data : pre/ post
  stockSchema.pre('save', function(next){
    console.log('Before saving data');
  
    if(this.quantity == 0){
      this.status = 'out-of-stock'
    }
    next()
  })
  /* stockSchema.post('save', function(doc, next){
    console.log('After saving data');
    next()
  }) */
  
  stockSchema.methods.logger = function(){
    console.log(`Data saved for ${this.name}`)
  }
  //SCHEMA ==> Model ==> Query
  
  const Stock = mongoose.model('Stock', stockSchema)

  module.exports= Stock
  