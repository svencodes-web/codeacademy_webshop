import { getExecutor } from "#utils/dbExecutor.utils.js";

const createProduct = async (productMap, dbClient = null) => {
  const executor = getExecutor(dbClient);

  const columns = Object.keys(productMap);
  const values = Object.values(productMap);
  const placeholders = columns.map((_, i) => `$${i + 1}`);

  const sql = `INSERT INTO products(${columns.join(
    ", "
  )}) VALUES(${placeholders.join(", ")})
  RETURNING id, name, description, price_cents, image_url;
  `;

  const result = await executor(sql, values);

  return result.rows[0];
};

export { createProduct };
