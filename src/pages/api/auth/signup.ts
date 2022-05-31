import type { NextApiRequest, NextApiResponse } from "next";
import { checkInputs, makeResponse } from "../../../Back-End/helpers/functions";
import Users from "../../../Back-End/models/Users";
import Encryption from "../../../Back-End/library/Encryption";

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
    // check entries
    let checker = checkInputs(
      [
        "firstname",
        "lastname",
        "username",
        "password",
        "email",
        "profile_img_id",
      ],
      req.body
    );
    if (!checker.status) throw new Error(checker.missings);
    // get values
    let { firstname, lastname, username, password, email, profile_img_id } =
      checker.data;

    // encrypt password
    password = Encryption.encode(password);

    let u = new Users();
    // insert user
    await u.insert({
      firstname,
      lastname,
      username,
      password,
      email,
      profile_img_id,
    });

    result = makeResponse();
    res.status(200).json(result);
  } catch (err) {
    result = makeResponse(err.message, "error");
  }

  res.status(200).json(result);
}
