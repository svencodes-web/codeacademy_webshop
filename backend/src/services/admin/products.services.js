import { generateUUID } from "#utils/helpers.js";
import {
  createProductMap,
  updateProductMap,
} from "#models/mappings/products.mapping.js";
import {
  fetchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "#models/products.model.js";
import { ApiError } from "#utils/error.utils.js";

const getAllProductsService = async () => {
  const products = await fetchAllProducts([
    "id",
    "name",
    "description",
    "price_cents",
    "image_url",
    "stock_count",
  ]);

  if (!products) {
    throw new ApiError("Products could not be retrieved", 500);
  }

  const sanitizedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price_cents / 100,
    imageUrl: product.image_url,
    stockCount: product.stock_count,
  }));

  return sanitizedProducts;
};

const createProductService = async ({ name, description, price, imageUrl }) => {
  // Basic validation in production we would use zod

  if (isNaN(price)) {
    throw new ApiError("Price must be a valid number", 400);
  }

  if (price < 0) {
    throw new ApiError("Price cannot be negative", 400);
  }

  if (name.trim() === "" || description.trim() === "") {
    throw new ApiError("Name and description cannot be empty", 400);
  }

  if (imageUrl && typeof imageUrl !== "string") {
    throw new ApiError("Image URL must be a string", 400);
  }

  // Convert price to cents
  const priceInCents = Math.round(price * 100);
  const productId = generateUUID();

  const newProductMap = createProductMap({
    id: productId,
    name: name.trim(),
    description: description.trim(),
    priceInCents,
    imageUrl: imageUrl ? imageUrl.trim() : null,
  });

  const savedProduct = await createProduct(newProductMap);

  if (!savedProduct.id) {
    throw new ApiError("Failed to create product", 500);
  }

  return savedProduct;
};

const updateProductService = async ({
  id,
  name,
  description,
  price,
  imageUrl,
}) => {
  // Basic validation in production we would use zod

  if (isNaN(price)) {
    throw new ApiError("Price must be a valid number", 400);
  }

  if (price < 0) {
    throw new ApiError("Price cannot be negative", 400);
  }

  if (name.trim() === "" || description.trim() === "") {
    throw new ApiError("Name and description cannot be empty", 400);
  }

  if (imageUrl && typeof imageUrl !== "string") {
    throw new ApiError("Image URL must be a string", 400);
  }

  // Convert price to cents
  const priceInCents = Math.round(price * 100);

  const productMap = updateProductMap({
    id: id,
    name: name.trim(),
    description: description.trim(),
    priceInCents,
    imageUrl: imageUrl ? imageUrl.trim() : null,
  });

  const updatedProduct = await updateProduct(productMap);

  if (!updatedProduct || !updatedProduct.id) {
    throw new ApiError("Product not found or failed to update", 404);
  }

  return updatedProduct;
};

const deleteProductService = async (productId) => {
  const deletedProduct = await deleteProduct(productId);

  if (!deletedProduct.id) {
    throw new ApiError("Failed to delete product", 500);
  }

  return deletedProduct;
};

export {
  getAllProductsService,
  createProductService,
  updateProductService,
  deleteProductService,
};
