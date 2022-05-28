import ActionRecord from "../library/ActionRecord";

export default class Images extends ActionRecord {
  tableName = "images";

  fields = [
    { name: "id", type: "int", config: "NOT NULL AUTO_INCREMENT PRIMARY KEY" },
    { name: "path", type: "varchar", size: 255 },
  ];
}
