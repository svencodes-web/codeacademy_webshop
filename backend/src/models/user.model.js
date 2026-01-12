import { getExecutor } from "#utils/dbExecutor.utils.js";

/**
 *
 * @param {*} email - email adress of the user
 * @param {*} columns - a array of column names must be the exact column names from the database
 * @param {*} dbClient - The db connection to use from the pool
 */

const getUserByEmail = async (email, columns, dbClient = null) => {
  const executor = getExecutor(dbClient);

  const sql = `SELECT ${columns.join(
    ", "
  )} FROM users WHERE email = $1 LIMIT 1`;
  const value = [email];
  const result = await executor(sql, value);

  return result.rows[0];
};

/**
 *
 * @param {*} userMap - A mapping of the new user required keys being the db column names
 * @param {*} client The db connection to use from the pool
 */
const createUser = async (userMap, dbClient = null) => {
  const executor = getExecutor(dbClient);

  const columns = Object.keys(userMap);
  const values = Object.values(userMap);
  const placeholders = columns.map((_, i) => `$${i + 1}`);

  const sql = `INSERT INTO users(${columns.join(
    ", "
  )}) VALUES(${placeholders.join(", ")})
  RETURNING id, email;
  `;

  const result = await executor(sql, values);

  return result.rows[0];
};

export { getUserByEmail, createUser };
