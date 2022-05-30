import type { NextApiRequest, NextApiResponse } from "next";

import { tablesChecker } from "../../Back-End/library/Controler";
// import Controller from "../../BackEnd/library/Controler.ts";

type Data = {
  status: boolean;
  errors?: string[];
  result?: any;
};

export default async function test(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({result: tablesChecker()});
}
