import ActionRecord from "../library/ActionRecord";

export default class Chats extends ActionRecord {
  tableName = "chats";

  fields = [
    { name: "id", type: "int" },
    { name: "title", type: "varchar(255)" },
    { name: "link", type: "varchar(255)" },
    { name: "type", type: "varchar(255)" }, // pv => 0, group => 1
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
