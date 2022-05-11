import { query } from "../helpers/config";
import { conditionConverter } from "../helpers/functions";

export default class ActionRecord {
  tableName = "";
  fields: {
    name: string;
    type: string;
    dependency?:{
      type: string;
      table: string;
      field: string;
    }
  }[];
  async Find(
    tables: {
      type: string;
      name: string;
      condition: string;
    }[] = [],
    conditions: string = "",
    fields: string[] = [],
    page: number = 0,
    count: number = 0,
    orderBy: string[] = [],
    orderType: string = ""
  ) {
    let sql = "SELECT ";
    if (fields.length > 0) {
      sql += fields.join(", ") + " ";
    } else {
      sql += "* ";
    }
    if (tables.length > 0) {
      sql += `FROM ${tables[0].name} `;
      tables = tables.splice(0, 1);
      sql += tables.reduce((total, table) => {
        return total + `${table.type} JOIN ${table.name} ON ${table.condition}`;
      }, "");
    } else {
      sql += `FROM ${this.tableName} `;
    }
    if (conditions.length > 0) {
      let con = conditionConverter(conditions);
      sql += "WHERE " + con;
    }
    if (count !== 0) {
      sql += `limit ${count} `;
    }
    if (page !== 0) {
      sql += `OFFSET ${page * count} `;
    }
    if (orderBy.length !== 0) {
      sql += orderBy.join(", ") + " ";
    }
    if (orderType !== "") {
      sql += orderType + " ";
    }
    console.log(sql);
    let r = await query(sql);
    return r;
  }

  async Insert(fields: string[], values: string[] | number[]) {
    let index = fields.findIndex((val) => val.toLowerCase() === "id");
    if (index !== -1) {
      fields.splice(index, 1);
      values.splice(index, 1);
    }
    let sql = `INSERT INTO ${this.tableName}(${fields
      .map((value: string) => "`" + value + "`")
      .join(", ")}) VALUES (${values
      .map((value: string | number) => `"${value.toString()}"`)
      .join(", ")})`;
    console.log(sql);
    let r = await query(sql);
    r = { id: r.insertId };
    return r;
  }

  async Update(keyvalues: Object, conditions: string = "") {
    let con = "";
    if (conditions.length > 0) {
      con = " WHERE " + conditionConverter(conditions);
    }
    let kv = Object.keys(keyvalues).map((value) => {
      return `\`${value}\` = '${keyvalues[value]}'`;
    });
    let sql = `UPDATE ${this.tableName} SET ${kv.join(", ")}${con}`;
    console.log(sql);
    await query(sql);
    return true;
  }

  async Delete(conditions: string = "") {
    let con = "";
    if (conditions.length > 0) {
      con = " WHERE " + conditionConverter(conditions);
    }
    let sql = `DELETE FROM ${this.tableName}${con}`;
    console.log(sql);
    await query(sql);
    return true;
  }
}
