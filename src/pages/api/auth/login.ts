import type { NextApiRequest, NextApiResponse } from "next";
import {
  checkInputs,
  makePath,
  makeResponse,
} from "../../../Back-End/helpers/functions";
import Encryption from "../../../Back-End/library/Encryption";
import Users from "../../../Back-End/models/Users";
import { ResponseData } from "../../../Back-End/types/ActionRecordTypes";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) {
  let result: ResponseData;
  try {
    let checker = checkInputs(["username", "password"], request.body);
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
    for (let i = 0; i < res.length; i++) {
      if (Encryption.decode(res[i].password) == password) {
        user = res[i];
      }
    }
    if (typeof user === "undefined")
      throw new Error("Wrong username or password");
    user.profile = makePath(user.path);
    delete user.path;
    delete user.password;
    user.token = Encryption.encode(`${Date.now()}##${user.id}`);
    result = makeResponse(user);
  } catch (err) {
    result = makeResponse(err.message, "error");
  }

  response.status(200).json(result);
}
