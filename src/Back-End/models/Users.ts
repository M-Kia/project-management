import ActionRecord from "../library/ActionRecord";
import { Fields } from "../types/ActionRecordTypes";

export default class Users extends ActionRecord {
  tableName = "users";

  fields: Fields[] = [
    {
      name: "id",
      config: { type: "int", notNull: true },
      dependency: { type: "ispk" },
    },
    { name: "firstname", config: { type: "varchar", size: 255 } },
    { name: "lastname", config: { type: "varchar", size: 255 } },
    { name: "username", config: { type: "varchar", size: 255 } },
    { name: "password", config: { type: "varchar", size: 255 } },
    { name: "email", config: { type: "varchar", size: 255 } },
    {
      name: "profile_img_id",
      config: { type: "int" },
      dependency: {
        type: "isfk",
        table: "images",
        field: "id",
      },
    },
  ];
}
