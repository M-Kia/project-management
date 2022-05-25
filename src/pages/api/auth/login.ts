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
  try {
    let { username, password } = req.body;
    if (!(username && password)) throw new Error("missing argument");

    let u = new Users();

    let res = await u.find(`username/=/${username}&&password/=/${password}`);
    if (res.length == 0) throw new Error("Wrong username or password");

    result = {
      status: true,
      result: {
        data: req.body,
      },
    };
  } catch (err) {
    result = { status: false, errors: [err.message] };
  }
  res.status(200).json(result);
}
