const Store = require("../model/Store");

exports.getStoresService = async () => {
  const Stores = await Store.find({});
  return Stores;
};
exports.getStoresByIdService = async (id) => {
  const store = await Store.findOne({ _id: id });
  return store;
};

exports.createStoreService = async (data) => {
  const result = await Store.create(data);
  return result;
};
exports.updateStoreByIdService = async (id, data) => {
  //console.log(id, data)
  const result = await Store.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};

exports.deleteStoreByIdService = async (id) => {
  const result = await Store.deleteOne({ _id: id });
  return result;
};
