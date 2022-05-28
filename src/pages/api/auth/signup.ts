import type { NextApiRequest, NextApiResponse } from "next";
import { checkInputs } from "../../../Back-End/helpers/functions";
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
    let { firstname, lastname, username, password, email, profile_img_id } =
      checker.data;

    let u = new Users();

    let data = await u.insert({
      firstname,
      lastname,
      username,
      password,
      email,
      profile_img_id,
    });

    result = {
      status: true,
      result: {
        data,
      },
    };
  } catch (err) {
    result = {
      status: false,
      errors: [err.message],
    };
  }
  res.status(200).json(result);
}
