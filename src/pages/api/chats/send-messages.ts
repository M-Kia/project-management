import type { NextApiRequest, NextApiResponse } from "next";
import { checkInputs } from "../../../Back-End/helpers/functions";
import Chats from "../../../Back-End/models/Chats";
import ChatUserLinks from "../../../Back-End/models/ChatUserLinks";
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
    let checker = checkInputs(
      ["userId", "chat_id", "text", "type", "reply_id"],
      req.body
    );
    if (!checker.status) throw new Error(checker.missings);
    let { userId, chat_id, text, type, reply_id } = checker.data;

    let m = new Messages();

    await m.insert({
      chat_id,
      sender_id: userId,
      text,
      type,
      reply_id,
    });

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
