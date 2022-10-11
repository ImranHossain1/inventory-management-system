const Stock = require("../model/Stock")


exports.getStock = async(req,res,next)=>{
    try {
      /* const products = await Product
      .where('name').equals(/\w/)
      .where('quantity').gt(100).lt(600)
      .limit(2).sort({quantity :-1}) */
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

  exports.createProduct =async(req,res,next)=>{
    try {
      //save or create
      // const product = new Product(req.body)
      // const result = await product.save()
      const result = await createProductService(req.body)
      result.logger()
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
  exports.updateProductById = async (req,res,next)=>{
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
  exports.bulkUpdateProduct = async (req,res,next)=>{
    try {
      // console.log(req.body)
      const result = await bulkUpdateProductService(req.body);
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
  exports.deleteProductById = async (req,res,next)=>{
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

  exports.bulkDeleteProduct = async (req,res,next)=>{
    try {
      // console.log(req.body)
      const result = await bulkDeleteProductService(req.body.ids);
      res.status(200).json({
        status: "success",
        message: "Successfully Deleted the given products",
        data: result
      })
    } catch (error) {
      res.status(400).json({
        status: 'failed',
        message: "Couldn't delete the products",
        error: error.message
      })
    }
  }
