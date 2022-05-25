import type { NextApiRequest, NextApiResponse } from "next";

import Controler from "../../BackEnd/library/Controler";

type Data = {
  status: boolean;
  errors?: string[];
  result?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const request =
    typeof req.query.request === "string"
      ? req.query.request
      : req.query.request[0];
  let result: Data;
  try {
    let act = new Controler();
    let answer = await act.Action(request, req.body);
    console.log("answer", answer);
    result = {
      status: true,
      result: {
        answer,
        query: request,
        data: req.body,
      },
    };
  } catch (err) {
    result = { status: false, errors: [err] };
  }
  res.status(200).json(result);
}
