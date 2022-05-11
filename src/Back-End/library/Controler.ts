import { capitalize } from "../helpers/functions";
import type ActionRecord from "./ActionRecord";
import { query } from "../helpers/config";

import Customers from "../models/Customers";
import Images from "../models/Images";

export const CLASSES = {
  Customers: () => new Customers(),
  Images: () => new Images(),
};

async function tablesChecker() {
  let tables = await query(
    `SELECT TABLE_NAME as tablename, COLUMN_NAME as column_name, COLUMN_TYPE as column_type FROM information_schema.columns WHERE TABLE_SCHEMA = 'test';`
  );
  tables = tables.reduce(
    (
      total: object,
      value: { tablename: string; column_name: string; column_type: string }
    ) => {
      let tablename = capitalize(value.tablename);
      let obj = total?.[tablename];
      if (!obj) obj = [];
      total[tablename] = [
        ...obj,
        { name: value.column_name, type: value.column_type },
      ];
      return total;
    },
    {}
  );
  // NOT NULL AUTO_INCREMENT PRIMARY KEY
  Object.keys(CLASSES).forEach((theClass) => {
    let c = CLASSES[theClass]();
    if (Object.keys(tables).includes(theClass)) {
      c.fields.forEach((classField: { name: string; type: string }) => {
        let f = tables[theClass].find((v) => v.name === classField.name);
        if (!f) {
          query(
            `ALTER TABLE ${theClass.toLowerCase()} ADD ${classField.name} ${
              classField.type
            };`
          );
        } else if (!classField.type.includes(f.type)) {
          query(
            `ALTER TABLE ${theClass.toLowerCase()} MODIFY COLUMN ${
              classField.name
            } ${classField.type};`
          );
        }
      });
    } else {
      query(
        `CREATE TABLE ${theClass.toLowerCase()} (${c.fields
          .map((val) => {
            return `${val.name} ${val.type}`;
          })
          .join(", ")});`
      );
    }
  });
}

tablesChecker();

export default class Controler {
  async Action(query: string, posts: any) {
    let q = query.split("_");
    if (q.length < 2) {
      throw new Error("Wrong Query!?");
    }
    let action = q[0];
    q.splice(0, 1);
    let table = q.reduce((total, value) => {
      return total + capitalize(value);
    }, "");
    if (!Object.keys(CLASSES).includes(table)) {
      throw new Error(`Wrong Tablename!? tablename: ${table}`);
    }
    let x: ActionRecord = CLASSES[table]();
    let result: any;
    switch (capitalize(action)) {
      case "Find":
        let conditions = "",
          fields: string[] = [],
          page = 0,
          count = 0,
          orderBy: string[] = [],
          orderType = "";

        if (posts.conditions) {
          conditions = posts.conditions;
        }
        if (posts.fields) {
          fields = posts.fields.split(",");
        }
        if (posts.page) {
          page = parseInt(posts.page);
        }
        if (posts.count) {
          count = parseInt(posts.count);
        }
        if (posts.orderBy) {
          orderBy = posts.orderBy;
        }
        if (posts.orderType) {
          orderType = posts.orderType;
        }
        result = await x.Find(
          [],
          conditions,
          fields,
          page,
          count,
          orderBy,
          orderType
        );
        break;
      case "Insert":
        let keys = Object.keys(posts),
          values = keys.map((value) => posts[value]);
        result = await x.Insert(keys, values);
        break;
      case "Update":
        result = await x.Update(posts.keyvalues, posts.conditions);
        break;
      case "Delete":
        result = await x.Delete(posts.conditions);
        break;
      default:
        throw new Error("Wrong Action!?");
    }
    return result;
  }
}
