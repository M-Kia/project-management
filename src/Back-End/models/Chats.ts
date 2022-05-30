import ActionRecord from "../library/ActionRecord";
import { Fields } from "../types/ActionRecordTypes";

export default class Chats extends ActionRecord {
  tableName = "chats";

  fields: Fields[] = [
    {
      name: "id",
      config: { type: "int", notNull: true },
      dependency: { type: "ispk" },
    },
    { name: "title", config: { type: "varchar", size: 255 } },
    { name: "link", config: { type: "varchar", size: 255 } },
    { name: "type", config: { type: "varchar", size: 255 } }, // pv => 0, group => 1
    {
      name: "profile_id",
      config: { type: "int", notNull: true },
      dependency: {
        type: "isfk",
        table: "images",
        field: "id",
      },
    },
  ];
}
