const { getStoresService, getStoresByIdService, createStoreService, updateStoreByIdService, deleteStoreByIdService } = require("../services/store.service");

exports.getStore=async(req,res,next)=>{
    try {
        const stores = await getStoresService();
        res.status(200).json({
            status: 'success',
            data: stores
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: "Couldn't get the Store"
        })
    }
}
exports.getStoreById=async(req,res,next)=>{
    const {id}= req.params;
    try {
        const store = await getStoresByIdService(id);
        res.status(200).json({
            status: 'success',
            data: store
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: "Couldn't get the store"
        })
    }
}


exports.createStore=async(req,res,next)=>{
    try {
        const result = await createStoreService(req.body);
        res.status(200).json({
            status: 'success',
            message:'Successfully created the store!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: " Couldn't create the store"
        })
    }
}
exports.updateStoreById=async(req,res,next)=>{
    const {id}= req.params;
    try {
        const result = await updateStoreByIdService(id, req.body);
        if(!result.nModified){
            return res.status(400).json({
                status: "Failed",
                error: "Couldn't update the brand with this id"
            })
        }
        res.status(200).json({
            status: 'success',
            message: "Successfully Updated the store"
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: "Couldn't update the store with this id"
        })
    }
}


exports.deleteStoreById = async (req,res,next)=>{
    try {
      const {id} = req.params;
      const result = await deleteStoreByIdService(id);
      if(!result.deletedCount){
        return res.status(400).json({
          status : "Failed",
          error:"Couldn't delete the undefined Store"
        })
      }
      res.status(200).json({
        status: "success",
        message: "Successfully Deleted the store",
        data: result
      })
    } catch (error) {
      res.status(400).json({
        status: 'failed',
        message: "Couldn't delete the product",
        error: error.message
      })
    }
  }
