import type { NextApiRequest, NextApiResponse } from "next";
import { checkInputs, makeResponse } from "../../../Back-End/helpers/functions";
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

    let res = await u.find(`username/=/${username}&&password/=/${password}`);
    if (res.length == 0) throw new Error("Wrong username or password");

    result = makeResponse(res[0]);
  } catch (err) {
    result = makeResponse(err.message, "error");
  }
  
  res.status(200).json(result);
}
