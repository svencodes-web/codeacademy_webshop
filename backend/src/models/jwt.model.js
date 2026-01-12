import { getExecutor } from "#utils/dbExecutor.utils.js";

export const insertJwtToken = async (tokenData, client = null) => {
  const executor = getExecutor(client);

  const columns = Object.keys(tokenData);
  const values = Object.values(tokenData);
  const placeholders = columns.map((_, i) => `$${i + 1}`);

  const sql = `INSERT INTO jwt_tokens(${columns.join(
    ", "
  )}) VALUES(${placeholders.join(", ")})
  RETURNING jwt_token_id;
  `;

  const result = await executor(sql, values);

  return result.rows[0];
};
