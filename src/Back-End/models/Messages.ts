import ActionRecord from "../library/ActionRecord";
import { Fields } from "../types/ActionRecordTypes";

export default class Messages extends ActionRecord {
  tableName = "messages";

  fields: Fields[] = [
    {
      name: "id",
      config: { type: "int", notNull: true },
      dependency: { type: "ispk" },
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
      name: "sender_id",
      config: { type: "int", notNull: true },
      dependency: {
        type: "isfk",
        table: "users",
        field: "id",
        force: true
      },
    },
    { name: "text", config: { type: "varchar", size: 255 } },
    {
      name: "image_ids",
      config: { type: "varchar", size: 255 },
      dependency: {
        type: "multifk",
        table: "images",
        field: "id",
      },
    },
    { name: "type", config: { type: "int" } }, // 0 => normal, 1 => todo
    { name: "todo_status", config: { type: "varchar", size: 255 } }, // 0 => undone, 1 => done
    { name: "main_status", config: { type: "varchar", size: 255 } }, // 0 => normal, 1 => deleted
    {
      name: "todo_user_link",
      config: { type: "varchar", size: 255 },
      dependency: {
        type: "multifk",
        table: "users",
        field: "id",
      },
    },
    {
      name: "reply_id",
      config: { type: "int", notNull: true },
      dependency: {
        type: "isfk",
        table: "messages",
        field: "id",
      },
    },
    { name: "mtm", config: { type: "varchar", size: 255 } },
  ];
}
