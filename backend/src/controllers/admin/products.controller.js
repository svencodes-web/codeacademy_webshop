import { ApiError } from "#utils/error.utils.js";
import { createProductService } from "#services/admin/products.services.js";
const createProductController = async (req, res, next) => {
  const { name, description, price, imageUrl } = req.body;

  try {
    if (!name || !description || !price) {
      throw new ApiError(
        "Name, description, and price are required fields",
        400
      );
    }

    const newProduct = await createProductService({
      name,
      description,
      price,
      imageUrl: imageUrl || null,
    });

    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

export { createProductController };
