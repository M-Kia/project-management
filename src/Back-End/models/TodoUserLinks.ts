import ActionRecord from "../library/ActionRecord";
import { Fields } from "../types/ActionRecordTypes";

export default class TodoUserLinks extends ActionRecord {
  tableName = "todo_user_links";

  fields: Fields[] = [
    {
      name: "id",
      property: { type: "int", notNull: true },
      dependency: { type: "ispk" },
    },
    {
      name: "message_id",
      property: { type: "int" },
      dependency: { type: "isfk", table: "messages", field: "id", force: true },
    },
    {
      name: "user_id",
      property: { type: "int" },
      dependency: { type: "isfk", table: "users", field: "id", force: true },
    },
  ];
}
