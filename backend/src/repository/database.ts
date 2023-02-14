import mariadb, { Connection } from "mariadb";

let database: Connection | undefined = undefined;

const hostname = process.env.DB_HOST;
const dbname = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

export default async function getPool() {
  if (database !== undefined) return database;
  database = await mariadb.createConnection({
    host: hostname,
    database: dbname,
    user: username,
    password: password,
  });

  return database;
}

export async function initDatabase(): Promise<void> {
  try {
    const connection = await getPool();
    const query = `
        create table if not exists user_accounts
        (
            id int auto_increment not null,
            firstname varchar(100) not null,
            lastname varchar(100) not null,
            username varchar(50) not null,
            password varchar(500) not null,
            primary key ua_key_id (id),
            unique key ua_unique_code (username) 
        );
    `;
    await connection.query(query);
  } catch (err) {
    throw err;
  }
}
