import { getExecutor } from "#utils/dbExecutor.utils.js";

const fetchAllProducts = async (columns, limit, offset, dbClient = null) => {
  const executor = getExecutor(dbClient);

  const sql = `SELECT ${columns.join(", ")} FROM products LIMIT ${$1} OFFSET ${$2};`;

  const result = await executor(sql, [limit, offset]);

  return result.rows;
};

const createProduct = async (productMap, dbClient = null) => {
  const executor = getExecutor(dbClient);

  const columns = Object.keys(productMap);
  const values = Object.values(productMap);
  const placeholders = columns.map((_, i) => `$${i + 1}`);

  const sql = `INSERT INTO products(${columns.join(
    ", ",
  )}) VALUES(${placeholders.join(", ")})
  RETURNING id, name, description, price_cents, image_url;
  `;

  const result = await executor(sql, values);

  return result.rows[0];
};

const updateProduct = async (productMap, dbClient = null) => {
  const executor = getExecutor(dbClient);

  // Remove id from the fields to be updated
  const { id, ...updateFields } = productMap;
  const columns = Object.keys(updateFields);
  const values = Object.values(updateFields);

  if (columns.length === 0) {
    throw new Error("No fields to update");
  }
  // Generate the SET clause col = $1, col2 = $2 etc.
  const setClause = columns.map((col, i) => `${col} = $${i + 1}`).join(", ");
  const sql = `UPDATE products SET ${setClause} WHERE id = $${columns.length + 1} 
  RETURNING id, name, description, price_cents, image_url;`;

  const result = await executor(sql, [...values, id]);
  return result.rows[0];
};

const deleteProduct = async (productId, dbClient = null) => {
  const executor = getExecutor(dbClient);
  const sql = `DELETE FROM products WHERE id = $1 RETURNING id, name, description, price_cents, image_url;`;
  const result = await executor(sql, [productId]);
  return result.rows[0];
};

export { fetchAllProducts, createProduct, updateProduct, deleteProduct };
