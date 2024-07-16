import { createConnection } from 'mysql2';
import { config } from 'dotenv';

config();

const conInfo = {
        host: process.env.RDS_HOSTNAME,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE,
        port: process.env.RDS_PORT
}

const connection = createConnection(conInfo);
connection.connect();

export {connection};
