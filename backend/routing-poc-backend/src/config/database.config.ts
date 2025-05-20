export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  logging: boolean;
}

export const dbConfig = () => ({
  database: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "routing_poc",
    username: process.env.DB_USER || "example",
    password: process.env.DB_PASSWORD || "example",
    logging: true,
  } as DatabaseConfig,
});
