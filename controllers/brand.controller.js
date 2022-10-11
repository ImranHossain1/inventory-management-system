const { createBrandService, getBrandService, getBrandByIdService, updateBrandService } = require("../services/brand.service")

exports.getBrands=async(req,res,next)=>{
    try {
        const brands = await getBrandService();
        res.status(200).json({
            status: 'success',
            data: brands
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: " Couldn't get the brand"
        })
    }
}
exports.getBrandById=async(req,res,next)=>{
    const {id} = req.params;
    try {
        const brand = await getBrandByIdService(id);
        if(!brand){
            return res.status(400).json({
                status: "Failed",
                error: "Couldn't find a brand with this id"
            })
        }
        res.status(200).json({
            status: 'success',
            data: brand
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: " Couldn't get the brand"
        })
    }
}

exports.createBrand=async(req,res,next)=>{
    try {
        const result = await createBrandService(req.body);
        res.status(200).json({
            status: 'success',
            message:'Successfully created the Brand!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: " Couldn't create the brand"
        })
    }
}

exports.updateBrand=async(req,res,next)=>{
    const {id} = req.params;
    try {
        const result = await updateBrandService(id, req.body);
        if(!result.nModified){
            return res.status(400).json({
                status: "Failed",
                error: "Couldn't update the brand with this id"
            })
        }
        res.status(200).json({
            status: 'success',
            message: "Successfully update the brand"
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: "Couldn't get the brand"
        })
    }
}
