import ActionRecord from "../library/ActionRecord";
import { Fields } from "../types/ActionRecordTypes";

export default class Chats extends ActionRecord {
  tableName = "chats";

  fields: Fields[] = [
    {
      name: "id",
      property: { type: "int", notNull: true },
      dependency: { type: "ispk" },
    },
    { name: "title", property: { type: "varchar", size: 255 } },
    { name: "link", property: { type: "varchar", size: 255 } },
    { name: "type", property: { type: "varchar", size: 255 } }, // pv => 0, group => 1
    {
      name: "profile_id",
      property: { type: "int" },
      dependency: {
        type: "isfk",
        table: "images",
        field: "id",
      },
    },
  ];
}
