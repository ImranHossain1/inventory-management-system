const { getCategoriesService,createCategoryService,getCategoryByIdService,updateCategoryByIdService, deleteCategoryByIdService} = require("../services/category.service");

exports.getCategory=async(req,res,next)=>{
    try {
        const categories = await getCategoriesService();
        res.status(200).json({
            status: 'success',
            data: categories
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: "Couldn't get the Categories"
        })
    }
}
exports.getCategoryById=async(req,res,next)=>{
    const {id}= req.params;
    try {
        const category = await getCategoryByIdService(id);
        res.status(200).json({
            status: 'success',
            data: category
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: "Couldn't get the category"
        })
    }
}


exports.createCategory=async(req,res,next)=>{
    try {
        const result = await createCategoryService(req.body);
        res.status(200).json({
            status: 'success',
            message:'Successfully created the Category!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: " Couldn't create the Category"
        })
    }
}
exports.updateCategoryById=async(req,res,next)=>{
    const {id}= req.params;

    try {
        const result = await updateCategoryByIdService(id, req.body);
        if(!result.nModified){
            return res.status(400).json({
                status: "Failed",
                error: "Couldn't update the brand with this id"
            })
        }
        res.status(200).json({
            status: 'success',
            message: "Successfully Updated the Category"
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: "Couldn't update the category with this id"
        })
    }
}

exports.deleteCategoryById = async (req,res,next)=>{
    try {
      const {id} = req.params;
      const result = await deleteCategoryByIdService(id);
      if(!result.deletedCount){
        return res.status(400).json({
          status : "Failed",
          error:"Couldn't delete the undefined Category"
        })
      }
      res.status(200).json({
        status: "success",
        message: "Successfully Deleted the Category",
        data: result
      })
    } catch (error) {
      res.status(400).json({
        status: 'failed',
        message: "Couldn't delete the category",
        error: error.message
      })
    }
  }