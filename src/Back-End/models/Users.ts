import ActionRecord from "../library/ActionRecord";

export default class Users extends ActionRecord {
  tableName = "users";

  fields = [
    { name: "id", type: "int", config: "NOT NULL AUTO_INCREMENT PRIMARY KEY" },
    { name: "firstname", type: "varchar", size: 255 },
    { name: "lastname", type: "varchar", size: 255 },
    { name: "username", type: "varchar", size: 255 },
    { name: "password", type: "varchar", size: 255 },
    { name: "email", type: "varchar", size: 255 },
    {
      name: "profile_img_id",
      type: "int",
      dependency: {
        type: "isfk",
        table: "images",
        field: "id",
      },
    },
  ];
}
