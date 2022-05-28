import type { NextApiRequest, NextApiResponse } from "next";
import { checkInputs } from "../../../Back-End/helpers/functions";
import Chats from "../../../Back-End/models/Chats";
import Chat_user_links from "../../../Back-End/models/Chat_user_links";
import Messages from "../../../Back-End/models/Messages";
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
