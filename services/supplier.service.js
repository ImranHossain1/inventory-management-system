const Supplier = require("../model/Supplier");


exports.getSupplierService = async()=>{
    const suppliers = await Supplier.find({});
    return suppliers;
}
exports.getSupplierByIdService = async(id)=>{
    const supplier = await Supplier.findOne({_id: id});
    return supplier;
}

exports.createSupplierService = async(data)=>{
    const result = await Supplier.create(data);
    return result
}


exports.updateSupplierService = async(id, data)=>{
    const result = await Supplier.updateOne({_id: id}, data, {
        runValidators: true
    });
    return result;
}