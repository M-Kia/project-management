import ActionRecord from "../library/ActionRecord";
import { Fields } from "../types/ActionRecordTypes";

export default class Chat_user_links extends ActionRecord {
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
      },
    },
    {
      name: "user_id",
      config: { type: "int", notNull: true },
      dependency: {
        type: "isfk",
        table: "users",
        field: "id",
      },
    },
    { name: "type", type: "int" }, // 0 => pending, 1 => joined
    { name: "user_type", type: "int" }, // 0 => member, 1 => admin, 2 => owner
    {
      name: "last_message_saw",
      config: { type: "int", notNull: true },
      dependency: {
        type: "isfk",
        table: "messages",
        field: "id",
      },
    },
  ];
}
