import ActionRecord from "../library/ActionRecord";

export default class Chats extends ActionRecord {
  tableName = "chats";

  fields = [
    { name: "id", type: "int", config: "NOT NULL AUTO_INCREMENT PRIMARY KEY" },
    { name: "title", type: "varchar", size: 255 },
    { name: "link", type: "varchar", size: 255 },
    { name: "type", type: "varchar", size: 255 }, // pv => 0, group => 1
    {
      name: "profile_id",
      type: "int",
      dependency: {
        type: "isfk",
        table: "images",
        field: "id",
      },
    },
  ];
}
