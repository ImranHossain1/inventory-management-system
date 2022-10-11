const { getSupplierService, getSupplierByIdService, createSupplierService, updateSupplierService } = require("../services/supplier.service");

exports.getSuppliers=async(req,res,next)=>{
    try {
        const suppliers = await getSupplierService();
        res.status(200).json({
            status: 'success',
            data: suppliers
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: " Couldn't get the brand"
        })
    }
}
exports.getSupplierById=async(req,res,next)=>{
    const {id} = req.params;
    try {
        const supplier = await getSupplierByIdService(id);
        if(!brand){
            return res.status(400).json({
                status: "Failed",
                error: "Couldn't find a Supplier with this id"
            })
        }
        res.status(200).json({
            status: 'success',
            data: supplier
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: " Couldn't get the Supplier"
        })
    }
}

exports.createSupplier=async(req,res,next)=>{
    try {
        const result = await createSupplierService(req.body);
        res.status(200).json({
            status: 'success',
            message:'Successfully created the Supplier!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: " Couldn't create the Supplier"
        })
    }
}

exports.updateSupplier=async(req,res,next)=>{
    const {id} = req.params;
    try {
        const result = await updateSupplierService(id, req.body);
        if(!result.nModified){
            return res.status(400).json({
                status: "Failed",
                error: "Couldn't update the Supplier with this id"
            })
        }
        res.status(200).json({
            status: 'success',
            message: "Successfully update the Supplier"
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: "Couldn't get the Supplier"
        })
    }
}
