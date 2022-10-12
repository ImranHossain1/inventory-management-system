const mongoose = require("mongoose");
const Stock = require("../model/Stock");
const ObjectId = mongoose.Types.ObjectId;

exports.getStockService = async (filters, queries) => {
  // const stocks = await Stock.find(filters)
  //   .skip(queries.skip)
  //   .limit(queries.limit)
  //   .select(queries.fields)
  //   .sort(queries.sortBy);
  const stocks = await Stock.aggregate([
    {$match: {}},
    { $project: {
      store: 1,
      price: {$convert: {input: '$price', to:'int'}},
      quantity:1
    }},
    { $group: {_id: '$store.name', totalProductsPrice: { $sum: {$multiply: ['$price', '$quantity']}} }}
  ])
  const totalStocks = await Stock.countDocuments(filters);
  const pageCount = Math.ceil(totalStocks / queries.limit);
  return { totalStocks, pageCount, stocks: stocks };
};
exports.createStockService = async (data) => {
  const stock = await Stock.create(data);
  return stock;
};

exports.getStockBtIdService = async (id) => {
//   const stock = await Stock.findOne({ _id: id })
//     .populate("store.id")
//     .populate("suppliedBy.id")
//     .populate("brand.id");
  const stock = await Stock.aggregate([
    {$match: {_id: ObjectId(id)}}, 
    {
      $project: {
        name: 1,
        category: 1,
        quantity: 1,
        price: 1,
        productId: 1,
        'brand.name': { $toLower: '$brand.name'}
      }
    },
    {
      $lookup:{
        from: 'brands',
        localField: 'brand.name',
        foreignField: 'name',
        as: 'brandDetails'

      }
    }
  ])
  return stock;
};
/* exports.updateProductByIdService = async (productId, data) => {
  const result = await Product.updateOne(
    { _id: productId },
    { $inc: data },
    {
      runValidators: true,
    }
  );
  // const product = await Product.findById(productId);
  // const result = await product.set(data).save();
  return result;
};

exports.bulkUpdateProductService = async (data) => {
  // console.log(data.ids, data.data)
  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //     runValidators : true
  // })
  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });
  const result = await Promise.all(products);
  console.log(result);
  return result;
};
exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};
exports.bulkDeleteProductService = async (ids) => {
  const result = await Product.deleteMany({});
  return result;
};
 */
