const { createStockService, getStockService, getStockBtIdService } = require("../services/stock.service");


exports.getStocks = async(req,res,next)=>{
    try {
      let filters = {...req.query};

      //exclude sort, page, limit
      const excludeFields = ['sort', 'page', 'limit', 'fields'];
      excludeFields.forEach(field=>delete filters[field])
      
      
      //gt, lt, gte , lte
      let filtersString = JSON.stringify(filters)
      filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g,match =>`$${match}` )
      filters =  JSON.parse(filtersString)


      const queries = {}
      if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        queries.sortBy = sortBy
      }
      if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ')
        queries.fields = fields
        console.log(fields)
      }
      if(req.query.page){
        const {page=0, limit=10} = req.query ;
        const skip = (parseInt(page)-1)* parseInt(limit);
        queries.skip = skip;
        queries.limit = parseInt(limit);

       }

      const stocks = await getStockService(filters, queries)
      res.status(200).json({
        status:'success',
        data: stocks
      })
    } catch (error) {
      res.status(400).json({
        status:'failed',
        error: error.message,
        message:"Can't get the data"
      })
    }
  }

  exports.createStock =async(req,res,next)=>{
    try {
      const result = await createStockService(req.body)
      res.status(200).json({
        status: 'success',
        message:'Data inserted successfully!',
        data: result
    })
    } catch (error) {
      res.status(400).json({
        status: 'failed',
        message: 'Data is not inserted',
        error: error.message
      })
    }
  }
  exports.getStockById= async(req,res)=>{
    try {
      const {id} = req.params;
      const stock = await getStockBtIdService(id)
      if(!stock){
        return res.status(400).json({
          status: 'failed',
          error: "Couldn't get the stock with this id",
        })
      }
      res.status(200).json({
        status:'success',
        data: stock
      })

    } catch (error) {
      res.status(400).json({
        status: 'failed',
        message: "Can't get the stock",
        error: error.message
      })
    }
  }
/*   exports.updateStockById = async (req,res,next)=>{
    try {
      const {id} = req.params;
      const result = await updateProductByIdService(id, req.body);
      res.status(200).json({
        status: "success",
        message: "Successfully updated the product",
        data: result
      })
    } catch (error) {
      res.status(400).json({
        status: 'failed',
        message: "Couldn't update the product",
        error: error.message
      })
    }
  }
  
  exports.deleteStockById = async (req,res,next)=>{
    try {
      const {id} = req.params;
      const result = await deleteProductByIdService(id);
      if(!result.deletedCount){
        return res.status(400).json({
          status : "Failed",
          error:"Couldn't delete the undefined product"
        })
      }
      res.status(200).json({
        status: "success",
        message: "Successfully Deleted the product",
        data: result
      })
    } catch (error) {
      res.status(400).json({
        status: 'failed',
        message: "Couldn't update the product",
        error: error.message
      })
    }
  }
 */
