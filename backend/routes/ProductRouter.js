// routes/users.js
import express from "express"
import {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
} from "../controllers/ProductController.js"
import uploadImages from "../middleware/upload.js"

const ProductRouter = express.Router()

ProductRouter.use(uploadImages)
ProductRouter.route("/").get(getProducts)
ProductRouter.route("/upload").post(postProduct)
ProductRouter.route("/:id").get(getProduct).post(postProduct).put(putProduct).delete(deleteProduct)

export default ProductRouter
