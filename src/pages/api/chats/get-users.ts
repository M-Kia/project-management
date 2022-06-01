import type { NextApiRequest, NextApiResponse } from "next";
import { makePath, makeResponse } from "../../../Back-End/helpers/functions";
import Users from "../../../Back-End/models/Users";
import { ResponseData } from "../../../Back-End/types/ActionRecordTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): Promise<void> {
  let result: ResponseData;
  try {
    let u = new Users();
    let res = await u.find(
      "",
      ["`users`.`id`", "`users`.`firstname`", "`users`.`lastname`", "`users`.`username`", "`images`.`path`"],
      [{ type: "LEFT", fieldName: "profile_img_id" }]
    );
    for (let i = 0; i < res.length; i++) {
      res[i].path = makePath(res[i].path);
    }
    result = makeResponse(res)
  } catch (err) {
    result = makeResponse(err.message, "error");
  }
  res.status(200).json(result);
}
