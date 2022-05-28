import ActionRecord from "../library/ActionRecord";

export default class Messages extends ActionRecord {
  tableName = "messages";

  fields = [
    { name: "id", type: "int", config: "NOT NULL AUTO_INCREMENT PRIMARY KEY" },
    {
      name: "chat_id",
      type: "int",
      dependency: {
        type: "isfk",
        table: "chats",
        field: "id",
      },
    },
    {
      name: "sender_id",
      type: "int",
      dependency: {
        type: "isfk",
        table: "users",
        field: "id",
      },
    },
    { name: "text", type: "varchar", size: 255 },
    {
      name: "image_ids",
      type: "varchar",
      size: 255,
      dependency: {
        type: "multifk",
        table: "images",
        field: "id",
      },
    },
    { name: "type", type: "int" }, // 0 => normal, 1 => todo
    { name: "todo_status", type: "varchar", size: 255 }, // 0 => undone, 1 => done
    { name: "main_status", type: "varchar", size: 255 }, // 0 => normal, 1 => deleted
    {
      name: "todo_user_link",
      type: "varchar",
      size: 255,
      dependency: {
        type: "multifk",
        table: "messages",
        field: "id",
      },
    },
    {
      name: "reply_id",
      type: "int",
      dependency: {
        type: "isfk",
        table: "messages",
        field: "id",
      },
    },
    { name: "mtm", type: "varchar", size: 255 },
  ];
}
