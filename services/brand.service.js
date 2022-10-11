const Brand = require("../model/Brands")

exports.getBrandService = async()=>{
    const brands = await Brand.find({}).populate('products');
    return brands;
}
exports.getBrandByIdService = async(id)=>{
    const brand = await Brand.findOne({_id: id});
    return brand;
}

exports.createBrandService = async(data)=>{
    const result = await Brand.create(data);
    return result
}


exports.updateBrandService = async(id, data)=>{
    const result = await Brand.updateOne({_id: id}, data, {
        runValidators: true
    });
    return result;
}