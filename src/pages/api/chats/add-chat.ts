import type { NextApiRequest, NextApiResponse } from "next";
import Chats from "../../../Back-End/models/Chats";
import Chat_user_links from "../../../Back-End/models/Chat_user_links";

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
    let { userIds, ownerId, profile_id, title, type } = req.body;
    if (!(userIds && ownerId && profile_id && title && type))
      throw new Error("missing argument");
    let c = new Chats(), cul = new Chat_user_links();
    let res = await c.insert({
      title,
      type,
      profile_id,
    });
    await Promise.all(userIds.split(",").map(async value => {
      await cul.insert({
        chat_id: res.id,
        user_id: value,
        type: 1,
        user_type: value == ownerId ? 2 : 0
      })
    }))
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
