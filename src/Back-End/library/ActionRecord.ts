import { query } from "../helpers/config";
import { conditionConverter, getData } from "../helpers/functions";
import { Fields } from "../types/ActionRecordTypes";

// TODO: export class types for insert and update inputs and find exports
// TODO: find dependency set name for fields to diagnose
// config multifk => illegal in mysql
// TODO: write comments
// TODO: make config and secure passwords
// TODO: make default value for fields

export default class ActionRecord {
  tableName = "";
  fields: Fields[];

  async find(
    conditions: string = "",
    fields: string[] = [],
    tables: {
      type: string;
      fieldName: string;
    }[] = [],
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
    sql += `FROM ${this.tableName} `;
    if (tables.length > 0) {
      sql += tables.reduce((total, table) => {
        let theField: Fields | undefined = this.fields.find(
          (value) => value.name == table.fieldName
        );
        if (typeof theField === "undefined") return total;
        if (theField.dependency.type === "isfk")
          return (
            total +
            `${table.type} JOIN ${
              theField.dependency.table
            } ON ${`\`${this.tableName}\`.\`${theField.name}\` = \`${theField.dependency.table}\`.\`${theField.dependency.field}\` `}`
          );
        return total;
      }, "");
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
    // console.log("sql", sql);
    let r = await query(sql);
    return r;
  }

  async insert(data: Object) {
    try {
      delete data["id"];
    } catch (e) {}
    // console.log(this.constructor.name);
    let filteredData = getData(data, this.constructor.name);
    // let filteredData = data;
    let sql = `INSERT INTO ${this.tableName}(${Object.keys(filteredData)
      .map((value: string) => `\`${value}\``)
      .join(", ")}) VALUES (${Object.keys(filteredData)
      .map((value: string) => `"${filteredData[value].toString()}"`)
      .join(", ")})`;
    let r = await query(sql);
    r = { id: r.insertId };
    return r;
  }

  async update(keyvalues: Object, conditions: string = "") {
    let con = "";
    if (conditions.length > 0) {
      con = " WHERE " + conditionConverter(conditions);
    }
    let kv = Object.keys(keyvalues).map((value) => {
      return `\`${value}\` = '${keyvalues[value]}'`;
    });
    let sql = `UPDATE ${this.tableName} SET ${kv.join(", ")}${con}`;
    await query(sql);
    return true;
  }

  async delete(conditions: string = "") {
    let con = "";
    if (conditions.length > 0) {
      con = " WHERE " + conditionConverter(conditions);
    }
    let sql = `DELETE FROM ${this.tableName}${con}`;
    await query(sql);
    return true;
  }
}
