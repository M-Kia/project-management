import type { NextApiRequest, NextApiResponse } from "next";

import { tablesChecker } from "../../Back-End/library/Controler";
// import Controller from "../../BackEnd/library/Controler.ts";

export default async function test(
  req: NextApiRequest,
  res: NextApiResponse<Object>
): Promise<void> {
  let result = await tablesChecker();
  res.status(200).json({result });
}
