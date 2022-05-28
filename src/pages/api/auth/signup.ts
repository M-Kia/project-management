import type { NextApiRequest, NextApiResponse } from "next";
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
    let { firstname, lastname, username, password, email, profile_img_id } =
      req.body;
    if (
      !(
        firstname &&
        lastname &&
        username &&
        password &&
        email &&
        profile_img_id
      )
    )
      throw new Error("missing argument");

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
      arguments: req.body,
    };
  } catch (err) {
    result = {
      status: false,
      errors: [err.message],
      arguments: req.body,
    };
  }
  res.status(200).json(result);
}
