const mongoose = require("mongoose");
const {ObjectId}= mongoose.Schema.Types;
// schema design
const productSchema = mongoose.Schema({
    name : {
      type: String,
      required: [true, "Please provide a name for this product!"],
      trim: true, //Remove unused spaces
      unique: [true, "This name is already taken, please choose a different name"],
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
      validate: {
        validator: (value)=>{
          if(!Array.isArray(value)){
            return false;
          }
          let isValid = true;
          value.forEach(url=>{
            if(!validator.isURL(url)){
              isValid=  false;
            }
          });
          return isValid;
        },
        message: "Please provide a valid image urls"
      }
    }],
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
    }
  },{
    timestamps : true
  })
  //mongoose middlewares for saving data : pre/ post
  productSchema.pre('save', function(next){
    console.log('Before saving data');
  
    if(this.quantity == 0){
      this.status = 'out-of-stock'
    }
    next()
  })
  /* productSchema.post('save', function(doc, next){
    console.log('After saving data');
    next()
  }) */
  
  productSchema.methods.logger = function(){
    console.log(`Data saved for ${this.name}`)
  }
  //SCHEMA ==> Model ==> Query
  
  const Product = mongoose.model('Product', productSchema)

  module.exports= Product
  