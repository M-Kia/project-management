import type { NextApiRequest, NextApiResponse } from "next";
import { checkInputs, makeResponse } from "../../../Back-End/helpers/functions";
import Messages from "../../../Back-End/models/Messages";
import { ResponseData } from "../../../Back-End/types/ActionRecordTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): Promise<void> {
  let result: ResponseData;
  try {
    let checker = checkInputs(["message_id", "todo_status"], req.body);
    if (!checker.status) throw new Error(checker.missings);
    let { message_id, todo_status } = checker.data;

    let m = new Messages();

    await m.update(
      {
        todo_status,
      },
      `id/=/${message_id}`
    );

    result = makeResponse();
  } catch (err) {
    result = makeResponse(err.message, "error");
  }
  res.status(200).json(result);
}
