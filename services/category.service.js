const Category = require("../model/Category");

exports.getCategoriesService = async()=>{
    const categories = await Category.find({});
    return categories;
}
exports.getCategoryByIdService = async(id)=>{
    const category = await Category.findOne({_id:id});
    return category;
}

exports.createCategoryService = async(data)=>{
    const result = await Category.create(data);
    return result
}
exports.updateCategoryByIdService = async(id, data)=>{

    const result = await Category.updateOne({_id:id}, data, {
        runValidators: true
    });
    return result;
}

exports.deleteCategoryByIdService = async (id) => {
    const result = await Category.deleteOne({ _id: id });
    return result;
  };
  