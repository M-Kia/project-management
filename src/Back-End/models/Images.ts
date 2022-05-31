import ActionRecord from "../library/ActionRecord";
import { Fields } from "../types/ActionRecordTypes";

export default class Images extends ActionRecord {
  tableName = "images";

  fields: Fields[] = [
    {
      name: "id",
      property: { type: "int", notNull: true },
      dependency: { type: "ispk" },
    },
    { name: "path", property: { type: "varchar", size: 255 } },
  ];
}
