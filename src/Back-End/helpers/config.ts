import mysql from "mysql";
import util from "util";

export const config = {
  db: {
    host: "localhost",
    user: "root",
    password: "",
    database: "project-management",
  },
};

export const connection = mysql.createConnection(config.db);
export const query = util.promisify(connection.query).bind(connection);
