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
    let c = new Users();
    let res = await c.find(
      "",
      [],
      [{ type: "LEFT", fieldName: "profile_img_id" }]
    );
    result = {
      status: true,
      result: {
        data: res,
      },
    };
  } catch (err) {
    result = { status: false, errors: [err.message] };
  }
  res.status(200).json(result);
}
