import { v7 as uuidV7 } from "uuid";

// We use V7 UUIDs for better sorting and performance in postgreSQL
export const generateUUID = () => uuidV7();
