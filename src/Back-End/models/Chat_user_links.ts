import ActionRecord from "../library/ActionRecord";

export default class Chat_user_links extends ActionRecord {
  tableName = "chat_user_links";

  fields = [
    { name: "id", type: "int" },
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
      name: "user_id",
      type: "int",
      dependency: {
        type: "isfk",
        table: "chats",
        field: "id",
      },
    },
    { name: "type", type: "int" }, // 0 => pending, 1 => joined
    { name: "user_type", type: "int" }, // 0 => member, 1 => admin, 2 => owner
    {
      name: "last_message_saw",
      type: "int",
      dependency: {
        type: "isfk",
        table: "messages",
        field: "id",
      },
    },
  ];
}
