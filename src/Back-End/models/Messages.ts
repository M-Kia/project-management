import ActionRecord from "../library/ActionRecord";
import { Fields } from "../types/ActionRecordTypes";

export default class Messages extends ActionRecord {
  tableName = "messages";

  fields: Fields[] = [
    {
      name: "id",
      property: { type: "int", notNull: true },
      dependency: { type: "ispk" },
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
      name: "sender_id",
      property: { type: "int", notNull: true },
      dependency: {
        type: "isfk",
        table: "users",
        field: "id",
        force: true
      },
    },
    { name: "text", property: { type: "varchar", size: 255 } },
    {
      name: "image_ids",
      property: { type: "varchar", size: 255 },
      dependency: {
        type: "multifk",
        table: "images",
        field: "id",
      },
    },
    { name: "type", property: { type: "int" } }, // 0 => normal, 1 => todo
    { name: "todo_status", property: { type: "varchar", size: 255 } }, // 0 => undone, 1 => done
    { name: "main_status", property: { type: "varchar", size: 255 } }, // 0 => normal, 1 => deleted
    {
      name: "todo_user_link",
      property: { type: "varchar", size: 255 },
      dependency: {
        type: "multifk",
        table: "users",
        field: "id",
      },
    },
    {
      name: "reply_id",
      property: { type: "int" },
      dependency: {
        type: "isfk",
        table: "messages",
        field: "id",
      },
    },
    { name: "mtm", property: { type: "varchar", size: 255 } },
  ];
}
