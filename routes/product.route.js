const express = require ('express');
const productController = require('../controllers/product.controller');
const uploader = require('../middleware/uploader');
const router = express.Router();

router.post('/file-upload', uploader.array("image"), productController.fileUpload)
router.route('/bulk-update').patch(productController.bulkUpdateProduct)
router.route('/bulk-delete').delete(productController.bulkDeleteProduct)


router.route('/')
.get(productController.getProduct)
.post(productController.createProduct)



router.route("/:id")
.patch(productController.updateProductById)
.delete(productController.deleteProductById)

module.exports = router 