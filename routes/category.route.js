const express = require ('express');
const router = express.Router();
const categoryController = require("../controllers/category.controller")
router.route('/')
    .get(categoryController.getCategory)
    .post(categoryController.createCategory)

router.route("/:id")
    .get(categoryController.getCategoryById)
    .patch(categoryController.updateCategoryById)
    .delete(categoryController.deleteCategoryById)


module.exports = router 