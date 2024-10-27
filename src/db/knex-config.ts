import * as dotenv from 'dotenv';
import knex, { Knex } from 'knex';
dotenv.config();

const knexConfig: Knex.Config = {
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '3636',
        database: process.env.DB_NAME || 'database-foodtruck',
    },
};

const knexConnection: Knex = knex(knexConfig);

export default knexConnection;
