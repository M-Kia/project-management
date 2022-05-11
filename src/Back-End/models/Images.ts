import ActionRecord from "../library/ActionRecord";

export default class Images extends ActionRecord {
  tableName = "images";

  fields = [
    { name: "id", type: "int" },
    { name: "path", type: "varchar(255)" },
  ];
}
