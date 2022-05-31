import ActionRecord from "../library/ActionRecord";
import { Fields } from "../types/ActionRecordTypes";

export default class ChatUserLinks extends ActionRecord {
  tableName = "chat_user_links";

  fields: Fields[] = [
    {
      name: "id",
      property: { type: "int", notNull: true },
      dependency: {
        type: "ispk",
      },
    },
    {
      name: "chat_id",
      property: { type: "int", notNull: true },
      dependency: {
        type: "isfk",
        table: "chats",
        field: "id",
        force: true
      },
    },
    {
      name: "user_id",
      property: { type: "int", notNull: true },
      dependency: {
        type: "isfk",
        table: "users",
        field: "id",
        force: true
      },
    },
    { name: "type", property: {type: "int"} }, // 0 => joined, 1 => pending
    { name: "user_type", property: {type: "int"} }, // 0 => member, 1 => admin, 2 => owner
    {
      name: "last_message_saw",
      property: { type: "int" },
      dependency: {
        type: "isfk",
        table: "messages",
        field: "id",
      },
    },
  ];
}
