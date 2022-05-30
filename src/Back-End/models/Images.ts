import ActionRecord from "../library/ActionRecord";
import { Fields } from "../types/ActionRecordTypes";

export default class Images extends ActionRecord {
  tableName = "images";

  fields: Fields[] = [
    {
      name: "id",
      config: { type: "int", notNull: true },
      dependency: { type: "ispk" },
    },
    { name: "path", config: { type: "varchar", size: 255 } },
  ];
}
