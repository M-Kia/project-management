import ActionRecord from "../library/ActionRecord";

export default class Users extends ActionRecord {
  tableName = "users";

  fields = [
    { name: "id", type: "int" },
    { name: "firstname", type: "varchar(255)" },
    { name: "lastname", type: "varchar(255)" },
    { name: "username", type: "varchar(255)" },
    { name: "password", type: "varchar(255)" },
    { name: "email", type: "varchar(255)" },
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
