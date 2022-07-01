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
    let checker = checkInputs(["token"], req.body);
    if (!checker.status) throw new Error(checker.missings);
    let { token } = checker.data;

    let temp = Encryption.decode(token).split("##");

    let uid = temp[1];

    let u = new Users();

    let res = await u.find(
      `users\`.\`id/=/${uid}`,
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
    let user = res[0];
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

  res.status(200).json(result);
}
