import ActionRecord from "../library/ActionRecord";
import { Fields } from "../types/ActionRecordTypes";

export default class ChatUserLinks extends ActionRecord {
  tableName = "chat_user_links";

  fields: Fields[] = [
    {
      name: "id",
      config: { type: "int", notNull: true },
      dependency: {
        type: "ispk",
      },
    },
    {
      name: "chat_id",
      config: { type: "int", notNull: true },
      dependency: {
        type: "isfk",
        table: "chats",
        field: "id",
        force: true
      },
    },
    {
      name: "user_id",
      config: { type: "int", notNull: true },
      dependency: {
        type: "isfk",
        table: "users",
        field: "id",
        force: true
      },
    },
    { name: "type", config: {type: "int"} }, // 0 => joined, 1 => pending
    { name: "user_type", config: {type: "int"} }, // 0 => member, 1 => admin, 2 => owner
    {
      name: "last_message_saw",
      config: { type: "int" },
      dependency: {
        type: "isfk",
        table: "messages",
        field: "id",
      },
    },
  ];
}
