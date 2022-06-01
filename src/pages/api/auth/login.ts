import type { NextApiRequest, NextApiResponse } from "next";
import {
  checkInputs,
  makePath,
  makeResponse,
} from "../../../Back-End/helpers/functions";
import Encryption from "../../../Back-End/library/Encryption";
import Users from "../../../Back-End/models/Users";

type Data = {
  status: boolean;
  errors?: string[];
  result?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let result: Data;
  try {
    let checker = checkInputs(["username", "password"], req.body);
    if (!checker.status) throw new Error(checker.missings);
    let { username, password } = checker.data;

    let u = new Users();

    let res = await u.find(
      `username/=/${username}`,
      [
        "`users`.`id`",
        "`users`.`firstname`",
        "`users`.`lastname`",
        "`users`.`username`",
        "`users`.`email`",
        "`users`.`password`",
        "`images`.`path`",
      ],
      [{ fieldName: "profile_img_id", type: "LEFT" }]
    );
    let user;
    for (let i = 0; i < res.length; i++){
      if (Encryption.decode(res[i].password) == password){
        user = res[i]
      }
    }
    if (typeof user === "undefined") throw new Error("Wrong username or password");
    res[0].path = makePath(res[0].path);
    delete res[0].password
    result = makeResponse(res[0]);
  } catch (err) {
    result = makeResponse(err.message, "error");
  }

  res.status(200).json(result);
}
