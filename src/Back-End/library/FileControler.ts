import fs from "fs";
import path from "path";

import Images from "../models/Images";

const folderpath = path.join(process.cwd(), "src", "Back-End");

export default class FileController {
  checker = /^[a-zA-Z0-9\.\s\-_]+$/;

  async upload(file: any): Promise<number> {
    let filename = file.originalFilename;
    if (this.checker.test(filename)) {
      filename = filename.replace(/[\s-]+/, " ");
      filename = filename.replace(/[\s_]/, "-");

      let dirFiles = fs.readdirSync(folderpath);
      if (dirFiles.includes(filename)) {
        filename = file.newFilename + "." + filename.split(".").pop();
      }
    } else {
      filename = file.newFilename + "." + filename.split(".").pop();
    }

    let filepath = "uploads/" + filename;
    fs.renameSync(file.filepath, path.join(folderpath, filepath));
    let image = new Images();
    let result = await image.insert({ path: filepath });
    return result;
  }

  async groupUpload(files: any[]): Promise<number[]> {
    let result: number[] = [];
    for (const value of files) {
      let id = await this.upload(value);
      result.push(id);
    }
    return result;
  }
}
