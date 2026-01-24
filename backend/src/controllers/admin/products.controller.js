import { ApiError } from "#utils/error.utils.js";
import {
  getAllProductsService,
  createProductService,
  updateProductService,
  deleteProductService,
} from "#services/admin/products.services.js";

const getAllProductsController = async (req, res, next) => {
  const { limit, page } = req.query;
  try {
    const products = await getAllProductsService(limit, page);
    return res.status(200).json({
      message: "Products successfully retrieved",
      products: products,
    });
  } catch (error) {
    next(error);
  }
};

const createProductController = async (req, res, next) => {
  const { name, description, price, imageUrl } = req.body;

  try {
    if (!name || !description || !price) {
      throw new ApiError(
        "Name, description, and price are required fields",
        400,
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

const updateProductController = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, imageUrl } = req.body;
  try {
    if (!name || !description || !price) {
      throw new ApiError(
        "Name, description, and price are required fields",
        400,
      );
    }

    const updatedProduct = await updateProductService({
      id,
      name,
      description,
      price,
      imageUrl: imageUrl || null,
    });

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const deleteproductController = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id) {
      throw new ApiError("Product ID is required", 400);
    }

    const productDeleted = await deleteProductService(id);

    return res.status(200).json({
      message: "Product deleted successfully",
      product: productDeleted,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllProductsController,
  createProductController,
  updateProductController,
  deleteproductController,
};
