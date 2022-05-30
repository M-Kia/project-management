import ActionRecord from "../library/ActionRecord";
import { Fields } from "../types/ActionRecordTypes";

export default class MessageImagesLinks extends ActionRecord {
  tableName = "message_images_links";

  fields: Fields[] = [
    {
      name: "id",
      config: { type: "int", notNull: true },
      dependency: { type: "ispk" },
    },
    {
      name: "message_id",
      config: { type: "int" },
      dependency: { type: "isfk", table: "messages", field: "id", force: true },
    },
    {
      name: "image_id",
      config: { type: "int" },
      dependency: { type: "isfk", table: "images", field: "id", force: true },
    },
  ];
}
