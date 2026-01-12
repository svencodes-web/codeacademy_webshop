import { query } from "#db/index.js";

// Returns the right executor to be used in models
export const getExecutor = (client) => {
  const executor = client ? client.query.bind(client) : query;
  return executor;
};
