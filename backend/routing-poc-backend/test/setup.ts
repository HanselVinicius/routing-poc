import {PostgreSqlContainer} from "@testcontainers/postgresql";

const init = async () => {
    await Promise.all([
        initPostgres()
    ]);
};

const initPostgres = async () => {
    const postgres = await new PostgreSqlContainer("postgres:14.3")
        .withDatabase("routing_poc")
        .withUsername("example")
        .withPassword('example')
        .start();

    global.postgres = postgres;

    process.env.DB_HOST = postgres.getHost();
    process.env.DB_PORT = postgres.getPort().toString();
    process.env.DB_USER = postgres.getUsername();
    process.env.DB_PASSWORD = postgres.getPassword();
    process.env.DB_DATABASE = postgres.getDatabase();
};


export default init;