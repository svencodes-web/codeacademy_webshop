import { generateUUID } from "#utils/helpers.js";
import { createProductMap } from "#models/mappings/products.mapping.js";
import { createProduct } from "#models/products.model.js";
import { ApiError } from "#utils/error.utils.js";

const createProductService = async ({ name, description, price, imageUrl }) => {
  // Convert price to cents
  const priceInCents = Math.round(price * 100);
  const productId = generateUUID();

  const newProductMap = createProductMap({
    id: productId,
    name,
    description,
    priceInCents,
    imageUrl,
  });

  const savedProduct = await createProduct(newProductMap);

  if (!savedProduct.id) {
    throw new ApiError("Failed to create product", 500);
  }

  return savedProduct;
};

export { createProductService };
