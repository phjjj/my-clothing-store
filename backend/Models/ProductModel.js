import { queryDB } from "../db/queryDB.js"

// 전체 상품 조회
const getAllProducts = async (category_id, limit, offset) => {
  // product id를 통해 product_images 테이블을 조인하여 이미지 URL을 가져옴
  // 컬럼은 products 테이블의 product_images만 가져옴
  let query = `
    SELECT 
      products.*, 
      product_images.images
    FROM 
      products
    LEFT JOIN (
      SELECT 
        product_id, 
        GROUP_CONCAT(image_url) AS images 
      FROM 
        product_images 
      GROUP BY 
        product_id
    ) product_images ON products.id = product_images.product_id
  `

  if (category_id) {
    query += ` WHERE category_id = ${category_id}`
  }

  const limitQuery = ` LIMIT ${limit} OFFSET ${offset}`
  query += limitQuery

  return await queryDB(query)
}

// 총 상품 개수
const getTotalProducts = async (category_id) => {
  let query = `
    SELECT COUNT(*) AS totalProducts FROM products 
  `
  if (category_id) {
    query += ` WHERE category_id = ?`
  }
  const values = [category_id]
  const result = await queryDB(query, values)
  return result[0].totalProducts
}

// 상품 상세 조회
const getProductById = async (productId) => {
  const query = `
       SELECT 
      products.*, 
      product_images.images
    FROM 
      products
    LEFT JOIN (
      SELECT 
        product_id, 
        GROUP_CONCAT(image_url) AS images 
      FROM 
        product_images 
      GROUP BY 
        product_id
    ) product_images ON products.id = product_images.product_id
    WHERE products.id = ?
  `
  const values = [productId]
  const products = await queryDB(query, values)
  return products[0]
}

// 상품 추가
const createProduct = async (product) => {
  // 데이터 정규화를통해 image_url을 저장하지 않고, product_images 테이블을 만들어 이미지 URL을 저장

  const query = `
    INSERT INTO products (title, category_id, size, description, price)
    VALUES (?, ?, ?, ?, ?)
  `
  const values = [
    product.title,
    product.category_id,
    product.size,
    product.description,
    product.price,
  ]
  const result = await queryDB(query, values)

  return result
}

// 상품 수정
const updateProduct = async (productId, product) => {
  const query = `
    UPDATE products
    SET title = ?, category_id = ?, summary = ?, description = ?, price = ?
    WHERE id = ?
  `
  const values = [
    product.title,
    product.category_id,
    product.summary,
    product.description,
    product.price,
    productId,
  ]
  return await queryDB(query, values)
}

// 상품 이미지 추가
const addProductImages = async (imageUrls) => {
  const query = `
    INSERT INTO product_images (product_id, image_url)
    VALUES ?`

  const values = imageUrls.map((image) => [image.productId, image.imageUrl])

  await queryDB(query, [values])
}

// 상품 이미지 삭제
const deleteProductImages = async (productId) => {
  const query = `
    DELETE FROM product_images
    WHERE product_id = ?
  `
  const values = [productId]
  await queryDB(query, values)
}

// 상품 삭제
const deleteProduct = async (productId) => {
  const query = `
    DELETE FROM products
    WHERE id = ?
  `
  const values = [productId]
  return await queryDB(query, values)
}

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  addProductImages,
  deleteProductImages,
  getTotalProducts,
  deleteProduct,
}
