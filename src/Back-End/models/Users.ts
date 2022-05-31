import ActionRecord from "../library/ActionRecord";
import { Fields } from "../types/ActionRecordTypes";

export default class Users extends ActionRecord {
  tableName = "users";

  fields: Fields[] = [
    {
      name: "id",
      property: { type: "int", notNull: true },
      dependency: { type: "ispk" },
    },
    { name: "firstname", property: { type: "varchar", size: 255 } },
    { name: "lastname", property: { type: "varchar", size: 255 } },
    { name: "username", property: { type: "varchar", size: 255 } },
    {
      name: "password",
      property: { type: "varchar", size: 255 },
      config: { encryption: true },
    },
    { name: "email", property: { type: "varchar", size: 255 } },
    {
      name: "profile_img_id",
      property: { type: "int" },
      dependency: {
        type: "isfk",
        table: "images",
        field: "id",
      },
    },
  ];
}
